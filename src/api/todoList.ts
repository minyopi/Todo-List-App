import axios from 'axios';
import {
  getTodoResponse,
  todoParams,
  createTodoResponse,
  deleteTodoResponse,
  getTodoByIdResponse,
  updateTodoResponse,
  Token,
} from '../typings/todoList';

export const getTodo = (token: Token): Promise<getTodoResponse> | undefined => {
  if (!token) {
    return;
  }

  return axios.get('/todos');
};

export const getTodoById = (id: string, token: Token): Promise<getTodoByIdResponse> | undefined => {
  if (!token) {
    return;
  }

  return axios.get(`todos/${id}`);
};

export const createTodo = (todo: todoParams, token: Token): Promise<createTodoResponse> | undefined => {
  if (!token) {
    return;
  }

  return axios.post('/todos', todo);
};

export const updateTodoList = (id: string, todo: todoParams, token: Token): Promise<updateTodoResponse> | undefined => {
  if (!token) {
    return;
  }

  return axios.put(`/todos/${id}`, todo);
};

export const deleteTodoList = (id: string, token: Token): Promise<deleteTodoResponse> | undefined => {
  if (!token) {
    return;
  }

  return axios.delete(`/todos/${id}`);
};
