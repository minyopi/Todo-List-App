import { CommonResponse } from './';

export type Token = string | undefined;

export interface TodoParams {
  title: string;
  content: string;
}

export interface TodoData {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetTodoResponse extends CommonResponse {
  data: { data: TodoData[] };
}

export interface GetTodoByIdResponse extends CommonResponse {
  data: { data: TodoData };
}

export interface CreateTodoResponse extends CommonResponse {
  data: { data: TodoData };
}

export interface UpdateTodoResponse extends CommonResponse {
  data: { data: TodoData };
}

export interface DeleteTodoResponse extends CommonResponse {
  data: { data: null };
}
