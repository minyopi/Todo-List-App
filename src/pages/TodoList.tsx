import styled from 'styled-components';
import StyledLink from '../styles/common/StyledLink';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import { createTodo, deleteTodoList, getTodo } from '../api/todoList';
import { getTodoResponse } from '../typings/todoList';

const StyledTodoListWrapper = styled.div`
  padding: 40px;

  h1 {
    font-size: 20px;
    font-weight: bold;
  }
`;

const TodoList: React.FC = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');
  const [todos, setTodos] = useState<getTodoResponse>({ data: [] });
  const [formValue, setFormValue] = useState({ title: '', content: '' });

  console.log(todos);

  const getTodos = async () => {
    const response = await getTodo();
    setTodos(response.data);
  };

  useMount(async () => {
    getTodos();
  });

  useEffect(() => {
    if (!authToken) {
      alert('로그인이 필요합니다!');
      navigate('/auth');
    }
  }, [authToken]);

  const renderCreateTodoForm = () => {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await createTodo(formValue);
            await getTodos();
            setFormValue({ title: '', content: '' });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {/* Title */}
        <div>
          title:
          <input
            type="text"
            value={formValue.title}
            onChange={(e) => {
              setFormValue((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
          />
        </div>

        {/* Content */}
        <div>
          content:
          <textarea
            value={formValue.content}
            onChange={(e) => {
              setFormValue((prev) => {
                return { ...prev, content: e.target.value };
              });
            }}
          />
        </div>

        {/* Add Button */}
        <button type="submit">추가하기</button>
      </form>
    );
  };

  const renderTodoList = () => {
    if (todos.data.length === 0) {
      return;
    }

    const todoList = todos.data.map((todo) => {
      return (
        <li>
          <StyledLink to={`/detail/${todo.id}`}>{`- ${todo.title}`}</StyledLink>
          <button>수정</button>
          <button
            onClick={async () => {
              await deleteTodoList(todo.id);
              await getTodos();
            }}
          >
            삭제
          </button>
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
