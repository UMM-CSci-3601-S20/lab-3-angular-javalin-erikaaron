import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo, statusType } from './todo';

@Injectable()
export class TodoService {
  readonly todoUrl: string = environment.API_URL + 'todos';

  constructor(private httpClient: HttpClient) {
  }

  getTodos(filters?: { category?: string, owner?: string, body?: string, orderBy?: string, status?: statusType}): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.orderBy) {
        httpParams = httpParams.set('orderBy', filters.orderBy);
      }
      if (filters.status) {
        httpParams = httpParams.set('status', filters.status);
      }
      if (filters.body) {
        httpParams = httpParams.set('body', filters.body);
      }
    }
    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
  }

  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }

  filterTodos(todos: Todo[], filters: { owner?: string, category?: string, body?: string, limit?: number }): Todo[] {

    let filteredTodos = todos;

    // Filter by owner
    if (filters.owner) {
      filters.owner = filters.owner.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return todo.owner.toLowerCase().indexOf(filters.owner) !== -1;
      });
    }

    // Filter by category
    if (filters.category) {
      filters.category = filters.category.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return todo.category.toLowerCase().indexOf(filters.category) !== -1;
      });
    }

    // Filter by body
    if (filters.body) {
       filters.body = filters.body.toLowerCase();
       filteredTodos = filteredTodos.filter(todo => {
          return todo.body.toLowerCase().indexOf(filters.body) !== -1;
        });
      }
    return filteredTodos;
  }
}
