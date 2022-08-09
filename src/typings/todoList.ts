export interface todoData {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface getTodoResponse {
  data: todoData[];
}
