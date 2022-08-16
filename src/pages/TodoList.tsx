import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useMutation, useQuery } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import { StyledLink, Layout } from '../components/common';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../apis/todoList';
import { authState } from '../store/auth';
import { Button, Form, Input, List, Typography } from 'antd';

import type { TodoData } from '../typings/todoList';
import type { FieldValues, SubmitHandler } from 'react-hook-form';

const { Title } = Typography;

const StyledTodoListWrapper = styled.div`
  h1 {
    margin-bottom: 16px;
  }
`;

const StyledTodoListItemWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TodoList: React.FC = () => {
  const { token } = useRecoilValue(authState);

  const createForm = useForm();
  const editForm = useForm();

  const getTodosQuery = useQuery('getTodos', getTodos, {
    enabled: false,
  });
  const createTodoMutation = useMutation(createTodo);
  const editTodoMutation = useMutation(updateTodo);
  const deleteTodoMutation = useMutation(deleteTodo);

  const [nowEditMode, setNowEditMode] = useState(false);
  const [nowClicked, setNowClicked] = useState(0);
  const [todos, setTodos] = useState<TodoData[]>([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    getTodosQuery.refetch().then((res) => {
      setTodos(res.data?.data.data ?? []);
    });
  }, [token]);

  const renderCreateTodoForm = () => {
    const onSubmit: SubmitHandler<FieldValues> = (values) => {
      const formValue = { title: values.title, content: values.content };

      createTodoMutation.mutate(formValue, {
        onSuccess: (data) => {
          setTodos((prev) => [...prev, data.data.data]);
          createForm.setValue('title', '');
          createForm.setValue('content', '');
        },
      });
    };

    return (
      <Form onFinish={createForm.handleSubmit(onSubmit)}>
        <Form.Item label="Title" name="title">
          <Controller
            control={createForm.control}
            name="title"
            render={({ field }) => <Input type="text" {...field} defaultValue="" placeholder="할일을 입력해주세요." />}
            rules={{ required: true }}
          />
        </Form.Item>
        <Form.Item label="Content" name="content">
          <Controller
            control={createForm.control}
            name="content"
            render={({ field }) => (
              <Input.TextArea {...field} defaultValue="" placeholder="자세한 내용을 입력해주세요." />
            )}
            rules={{ required: true }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={createTodoMutation.isLoading}>
            추가하기
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const renderTodoList = () => {
    if (!todos) {
      return;
    }

    const showEditForm = (todo: TodoData, idx: number) => {
      const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        const editValue = { title: values.title, content: values.content };

        editTodoMutation.mutate(
          { id: todo.id, todo: editValue },
          {
            onSuccess: (data) => {
              setTodos((prev) => {
                const newTodos = [...prev];
                newTodos[idx] = data.data.data;
                return newTodos;
              });
              setNowEditMode(false);
            },
          },
        );
      };

      return (
        <Form onFinish={editForm.handleSubmit(onSubmit)}>
          <Form.Item label="Title" name="title">
            <Controller
              control={editForm.control}
              name="title"
              render={({ field }) => <Input {...field} defaultValue={todo.title} placeholder="할일을 입력해주세요." />}
              rules={{ minLength: 1 }}
            />
          </Form.Item>
          <Form.Item label="Content" name="content">
            <Controller
              control={editForm.control}
              name="content"
              render={({ field }) => (
                <Input.TextArea {...field} defaultValue={todo.content} placeholder="자세한 내용을 입력해주세요." />
              )}
              rules={{ minLength: 1 }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={editTodoMutation.isLoading}>
            수정
          </Button>
          <Button
            type="default"
            htmlType="button"
            onClick={() => {
              setNowEditMode(false);
            }}
          >
            취소
          </Button>
        </Form>
      );
    };

    const showTodoList = (todo: TodoData, idx: number) => {
      return (
        <StyledTodoListItemWrapper>
          <div>
            <StyledLink to={`/detail/${todo.id}`}>{`- ${todo.title}`}</StyledLink>
          </div>
          <div>
            <Button
              type="primary"
              onClick={() => {
                setNowEditMode(true);
                setNowClicked(idx);
              }}
            >
              수정
            </Button>
            <Button
              type="default"
              onClick={() => {
                setNowClicked(idx);
                deleteTodoMutation.mutate(todo.id, {
                  onSuccess: () => {
                    setTodos((prev) => {
                      const newTodos = [...prev];
                      newTodos.splice(idx, 1);
                      return newTodos;
                    });
                  },
                });
              }}
              loading={nowClicked === idx && deleteTodoMutation.isLoading}
            >
              삭제
            </Button>
          </div>
        </StyledTodoListItemWrapper>
      );
    };

    const todoList = todos.map((todo, idx) => {
      return (
        <List.Item key={todo.id}>
          {nowEditMode && nowClicked === idx ? showEditForm(todo, idx) : showTodoList(todo, idx)}
        </List.Item>
      );
    });

    return todoList;
  };

  return (
    <Layout type="center">
      <StyledTodoListWrapper>
        <Title level={2}>Todo List</Title>
        <div>{renderCreateTodoForm()}</div>
        <List>{renderTodoList()}</List>
      </StyledTodoListWrapper>
    </Layout>
  );
};

export default TodoList;
