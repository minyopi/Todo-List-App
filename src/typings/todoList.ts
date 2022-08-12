export interface todoParams {
  title: string;
  content: string;
}

export interface todoData {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface commonResponse {
  config: any;
  headers: any;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface getTodoResponse extends commonResponse {
  data: { data: todoData[] };
}

export interface getTodoByIdResponse extends commonResponse {
  data: { data: todoData };
}

export interface createTodoResponse extends commonResponse {
  data: { data: todoData };
}

export interface updateTodoResponse extends commonResponse {
  data: { data: todoData };
}

export interface deleteTodoResponse extends commonResponse {
  data: { data: null };
}
