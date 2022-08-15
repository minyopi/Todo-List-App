import axios from 'axios';
import {
  GetTodoResponse,
  TodoParams,
  CreateTodoResponse,
  DeleteTodoResponse,
  GetTodoByIdResponse,
  UpdateTodoResponse,
  Token,
} from '../typings/todoList';

export const getTodo = (token: Token): Promise<GetTodoResponse> | undefined => {
  if (!token) {
    return;
  }

  return axios.get('/todos');
};

export const getTodoById = (id: string, token: Token): Promise<GetTodoByIdResponse> | undefined => {
  if (!token) {
    return;
  }

  return axios.get(`todos/${id}`);
};

export const createTodo = (todo: TodoParams, token: Token): Promise<CreateTodoResponse> | undefined => {
  if (!token) {
    return;
  }

  return axios.post('/todos', todo);
};

export const updateTodoList = (id: string, todo: TodoParams, token: Token): Promise<UpdateTodoResponse> | undefined => {
  if (!token) {
    return;
  }

  return axios.put(`/todos/${id}`, todo);
};

export const deleteTodoList = (id: string, token: Token): Promise<DeleteTodoResponse> | undefined => {
  if (!token) {
    return;
  }

  return axios.delete(`/todos/${id}`);
};
