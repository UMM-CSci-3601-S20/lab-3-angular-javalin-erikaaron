import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];

  // To be done in angular
  public todoOwner: string;
  public todoContains: string;
  public todoCategory: string;
  public todoLimit: number;

  // To be done on the server
  public todoStatus: boolean;
  public orderBy: string;


  constructor( private todoService: TodoService ) {

  }

  public updateFilter() {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, {owner: this.todoOwner, body: this.todoContains, category: this.todoCategory}
    ).slice(0, this.todoLimit);

  }

  public getTodosFromServer() {
    // Temporary until we properly implement filtering
    this.todoService.getTodos({
      status: this.todoStatus,
      orderBy: this.orderBy
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.filteredTodos = returnedTodos;
    });
    this.updateFilter();
  }

  ngOnInit(): void {
    this.getTodosFromServer();
  }

}
