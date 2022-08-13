import styled from 'styled-components';
import StyledLink from '../components/common/StyledLink';
import { useEffect, useState } from 'react';
import { createTodo, deleteTodoList, getTodo, updateTodoList } from '../api/todoList';
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
  const createForm = useForm();
  const editForm = useForm();
  const { token } = useRecoilValue(authState);

  const [nowEditMode, setNowEditMode] = useState(false);
  const [nowClicked, setNowClicked] = useState(0);
  const [todos, setTodos] = useState<TodoData[]>([]);

  const getTodos = (token: Token) => {
    try {
      getTodo(token)?.then((res) => {
        setTodos(res.data.data);
      });
    } catch (error) {
      console.error(error);
      alert('할일 불러오기에 실패했습니다.');
    }
  };

  useEffect(() => {
    getTodos(token);
  }, [token]);

  const renderCreateTodoForm = () => {
    const onSubmit: SubmitHandler<FieldValues> = (values) => {
      const formValue = { title: values.title, content: values.content };

      try {
        createTodo(formValue, token)?.then((res) => {
          setTodos((prev) => [...prev, res.data.data]);
          createForm.setValue('title', '');
          createForm.setValue('content', '');
        });
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <form onSubmit={createForm.handleSubmit(onSubmit)}>
        <div>
          title:
          <Controller
            control={createForm.control}
            name="title"
            render={({ field }) => <input {...field} defaultValue="" placeholder="할일을 입력해주세요." />}
            rules={{ required: true }}
          />
        </div>
        <div>
          content:
          <Controller
            control={createForm.control}
            name="content"
            render={({ field }) => <textarea {...field} defaultValue="" placeholder="자세한 내용을 입력해주세요." />}
            rules={{ required: true }}
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

    const showEditForm = (todo: TodoData, idx: number) => {
      const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        const editValue = { title: values.title, content: values.content };

        try {
          updateTodoList(todo.id, editValue, token)?.then((res) => {
            setTodos((prev) => {
              const newTodos = prev;
              newTodos[idx] = res.data.data;
              return newTodos;
            });
            setNowEditMode(false);
          });
        } catch (error) {
          console.error(error);
        }
      };

      return (
        <form onSubmit={editForm.handleSubmit(onSubmit)}>
          <div>
            title:
            <Controller
              control={editForm.control}
              name="title"
              render={({ field }) => <input {...field} defaultValue={todo.title} placeholder="할일을 입력해주세요." />}
              rules={{ minLength: 1 }}
            />
          </div>
          <div>
            content:
            <Controller
              control={editForm.control}
              name="content"
              render={({ field }) => (
                <textarea {...field} defaultValue={todo.content} placeholder="자세한 내용을 입력해주세요." />
              )}
              rules={{ minLength: 1 }}
            />
          </div>
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
      );
    };

    const showTodoList = (todo: TodoData, idx: number) => {
      return (
        <>
          {/* Todo List */}
          <StyledLink to={`/detail/${todo.id}`}>{`- ${todo.title}`}</StyledLink>
          <button
            onClick={() => {
              setNowEditMode(true);
              setNowClicked(idx);
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              try {
                deleteTodoList(todo.id, token)?.then(() =>
                  setTodos((prev) => {
                    const newTodos = [...prev];
                    newTodos.splice(idx, 1);
                    return newTodos;
                  }),
                );
              } catch (error) {
                console.error(error);
              }
            }}
          >
            삭제
          </button>
        </>
      );
    };

    const todoList = todos.map((todo, idx) => {
      return (
        <li key={todo.id}>{nowEditMode && nowClicked === idx ? showEditForm(todo, idx) : showTodoList(todo, idx)}</li>
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
