import axios from 'axios';
import { todoParams } from '../typings/todoList';

export const getTodo = () => {
  return axios.get('/todos');
};

export const getTodoById = (id: string) => {
  return axios.get(`todos/${id}`);
};

export const createTodo = (todo: todoParams) => {
  return axios.post('/todos', todo);
};

export const updateTodoList = (id: string, todo: todoParams) => {
  return axios.put(`/todos/${id}`, todo);
};

export const deleteTodoList = (id: string) => {
  return axios.delete(`/todos/${id}`);
};
