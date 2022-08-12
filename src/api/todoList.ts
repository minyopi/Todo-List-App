import axios from 'axios';
import {
  getTodoResponse,
  todoParams,
  createTodoResponse,
  deleteTodoResponse,
  getTodoByIdResponse,
  updateTodoResponse,
} from '../typings/todoList';

const checkAuthToken = () => {
  const authToken = localStorage.getItem('token');
  return authToken ? true : false;
};

export const getTodo = (): Promise<getTodoResponse> | undefined => {
  if (!checkAuthToken()) {
    return;
  }

  return axios.get('/todos');
};

export const getTodoById = (id: string): Promise<getTodoByIdResponse> | undefined => {
  if (!checkAuthToken()) {
    return;
  }

  return axios.get(`todos/${id}`);
};

export const createTodo = (todo: todoParams): Promise<createTodoResponse> | undefined => {
  if (!checkAuthToken()) {
    return;
  }

  return axios.post('/todos', todo);
};

export const updateTodoList = (id: string, todo: todoParams): Promise<updateTodoResponse> | undefined => {
  if (!checkAuthToken()) {
    return;
  }

  return axios.put(`/todos/${id}`, todo);
};

export const deleteTodoList = (id: string): Promise<deleteTodoResponse> | undefined => {
  if (!checkAuthToken()) {
    return;
  }

  return axios.delete(`/todos/${id}`);
};
