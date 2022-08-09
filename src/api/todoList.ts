import axios from 'axios';
const AUTH_TOKEN = localStorage.getItem('token');

if (AUTH_TOKEN) {
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
}

axios.defaults.baseURL = 'http://localhost:8080';

interface todoProps {
  title: string;
  content: string;
}

const hasAuthToken = () => {
  if (AUTH_TOKEN) {
    return;
  }
};

export const getTodo = () => {
  hasAuthToken();

  const data = axios.get('/todos');
  return data;
};

export const getTodoById = (id: string) => {
  hasAuthToken();

  const data = axios.get(`todos/${id}`);
  return data;
};

export const createTodo = (todo: todoProps) => {
  hasAuthToken();

  const data = axios.post('/todos', todo);
  return data;
};

export const updateTodoList = (id: string, todo: todoProps) => {
  hasAuthToken();

  const data = axios.put(`/todos/${id}`, todo);
  return data;
};

export const deleteTodoList = (id: string) => {
  hasAuthToken();

  const data = axios.delete(`/todos/${id}`);
  return data;
};
