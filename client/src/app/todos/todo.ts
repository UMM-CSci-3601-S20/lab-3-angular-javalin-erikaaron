export interface Todo {
  _id: string;
  owner: string;
  status: statusType;
  body: string;
  category: string;
}

export type statusType = 'complete' | 'incomplete';
