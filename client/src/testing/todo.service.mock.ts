import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo, statusType } from '../app/todos/todo';
import { TodoService } from '../app/todos/todo.service';

/**
 * A "mock" version of the `UserService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockTodoService extends TodoService {
  static testTodos: Todo[] = [
    {
      _id: 'blanche_id',
      owner: 'blanche',
      status: 'incomplete',
      body: 'Turn it off',
      category: 'video games'
    },
    {
      _id: 'rose_id',
      owner: 'rose',
      status: 'complete',
      body: 'Like a light switch',
      category: 'groceries'
    },
    {
      _id: 'dorothy_id',
      owner: 'dorothy',
      status: 'incomplete',
      body: 'Just go *click*',
      category: 'software design'
    },
    {
      _id: 'sofia_id',
      owner: 'sofia',
      status: 'complete',
      // tslint:disable-next-line: quotemark
      body: "It's a cool little mormon trick",
      category: 'homework'
    }
  ];

  constructor() {
    super(null);
  }

  getTodos(filters?: { category?: string, owner?: string, status?: statusType, body?: string }): Observable<Todo[]> {
    // Just return the test todos regardless of what filters are passed in
    return of(MockTodoService.testTodos);
  }

  getTodoById(id: string): Observable<Todo> {
    // If the specified ID is for the first test todo,
    // return that todo, otherwise return `null` so
    // we can test illegal todo requests.
    if (id === MockTodoService.testTodos[0]._id) {
      return of(MockTodoService.testTodos[0]);
    } else {
      return of(null);
    }
  }

}
