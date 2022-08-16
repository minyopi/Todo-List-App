import { UpdateTodoListParams } from './../typings/todoList';
import axios from 'axios';
import {
  GetTodoResponse,
  TodoParams,
  CreateTodoResponse,
  DeleteTodoResponse,
  GetTodoByIdResponse,
  UpdateTodoResponse,
} from '../typings/todoList';

export const getTodo = (): Promise<GetTodoResponse> => {
  return axios.get('/todos');
};

export const getTodoById = (id: string): Promise<GetTodoByIdResponse> => {
  return axios.get(`todos/${id}`);
};

export const createTodo = (todo: TodoParams): Promise<CreateTodoResponse> => {
  return axios.post('/todos', todo);
};

export const updateTodoList = ({ id, todo }: UpdateTodoListParams): Promise<UpdateTodoResponse> => {
  return axios.put(`/todos/${id}`, todo);
};

export const deleteTodoList = (id: string): Promise<DeleteTodoResponse> => {
  return axios.delete(`/todos/${id}`);
};
