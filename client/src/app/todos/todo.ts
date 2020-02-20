export interface Todo {
  _id: string;
  owner: string;
  status: TodoStatus;
  body: string;
  category: string;
}

// tslint:disable-next-line: quotemark
export type TodoStatus = "true" | "false";
