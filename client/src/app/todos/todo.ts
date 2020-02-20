export interface Todo {
  _id: string;
  owner: string;
  status: number;
  body: string;
  category: TodoCategory;
}

export type TodoCategory = "groceries" | "software design" | "video games"|"homework";
