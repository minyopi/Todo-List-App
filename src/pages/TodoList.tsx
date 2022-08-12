import styled from 'styled-components';
import StyledLink from '../components/common/StyledLink';
import { useEffect, useState } from 'react';
import { createTodo, deleteTodoList, getTodo, updateTodoList } from '../api/todoList';
import TodoFormInputs from '../components/todoList/TodoFormInputs';
import { useRecoilValue } from 'recoil';
import { authState } from '../store/auth';
import { Controller, useForm } from 'react-hook-form';

import type { TodoData, Token } from '../typings/todoList';
import type { FieldValues, SubmitHandler } from 'react-hook-form';

const StyledTodoListWrapper = styled.div`
  padding: 40px;

  h1 {
    font-size: 20px;
    font-weight: bold;
  }
`;

const TodoList: React.FC = () => {
  const { token } = useRecoilValue(authState);
  const { control, handleSubmit, getValues, setValue } = useForm();
  console.log(getValues());

  const [nowEditMode, setNowEditMode] = useState(false);
  const [nowClicked, setNowClicked] = useState(0);
  const [todos, setTodos] = useState<{ data: TodoData[] }>();
  const [editValue, setEditValue] = useState({ title: '', content: '' });

  const getTodos = async (token: Token) => {
    const response = await getTodo(token);
    setTodos(response?.data);
  };

  useEffect(() => {
    getTodos(token);
  }, [token]);

  const renderCreateTodoForm = () => {
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
      const formValue = { title: values.todoCreateTitle, content: values.todoCreateContent };

      try {
        await createTodo(formValue, token);
        await getTodos(token);
        setValue('todoCreateTitle', '');
        setValue('todoCreateContent', '');
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          title:
          <Controller
            control={control}
            name="todoCreateTitle"
            render={({ field }) => <input {...field} defaultValue="" placeholder="할일을 입력해주세요." />}
          />
        </div>
        <div>
          content:
          <Controller
            control={control}
            name="todoCreateContent"
            render={({ field }) => <textarea {...field} defaultValue="" placeholder="자세한 내용을 입력해주세요." />}
          />
        </div>
        <button type="submit">추가하기</button>
      </form>
    );
  };

  const renderTodoList = () => {
    if (!todos) {
      return;
    }

    const todoList = todos.data.map((todo, idx) => {
      return (
        <li key={todo.id}>
          {nowEditMode && nowClicked === idx ? (
            <>
              {/* Edit Mode */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  await updateTodoList(todo.id, editValue, token);
                  await getTodos(token);
                  setNowEditMode(false);
                }}
              >
                <TodoFormInputs
                  formValue={editValue}
                  onChangeTitle={(e) => {
                    setEditValue((prev) => {
                      return { ...prev, title: e.target.value };
                    });
                  }}
                  onChangeContent={(e) => {
                    setEditValue((prev) => {
                      return { ...prev, content: e.target.value };
                    });
                  }}
                />
                <button type="submit">수정</button>
                <button
                  type="button"
                  onClick={() => {
                    setNowEditMode(false);
                  }}
                >
                  취소
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Todo List */}
              <StyledLink to={`/detail/${todo.id}`}>{`- ${todo.title}`}</StyledLink>
              <button
                onClick={() => {
                  setNowEditMode(true);
                  setNowClicked(idx);
                  setEditValue({ title: todo.title, content: todo.content });
                }}
              >
                수정
              </button>
              <button
                onClick={async () => {
                  const res = await deleteTodoList(todo.id, token);
                  console.log(res);
                  await getTodos(token);
                }}
              >
                삭제
              </button>
            </>
          )}
        </li>
      );
    });

    return todoList;
  };

  return (
    <StyledTodoListWrapper>
      <h1>Todo List</h1>
      <div>{renderCreateTodoForm()}</div>
      <ul>{renderTodoList()}</ul>
    </StyledTodoListWrapper>
  );
};

export default TodoList;
