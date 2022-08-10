import axios from 'axios';

const AUTH_TOKEN = localStorage.getItem('token');

if (AUTH_TOKEN) {
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
}

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

interface todoParams {
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

  return axios.get('/todos');
};

export const getTodoById = (id: string) => {
  hasAuthToken();

  return axios.get(`todos/${id}`);
};

export const createTodo = (todo: todoParams) => {
  hasAuthToken();

  return axios.post('/todos', todo);
};

export const updateTodoList = (id: string, todo: todoParams) => {
  hasAuthToken();

  return axios.put(`/todos/${id}`, todo);
};

export const deleteTodoList = (id: string) => {
  hasAuthToken();

  return axios.delete(`/todos/${id}`);
};
