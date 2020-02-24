import { Component, OnInit } from '@angular/core';
import { Todo, statusType } from './todo';
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
  public todoStatus: statusType;
  public orderBy: string;


  constructor( private todoService: TodoService ) {

  }

  public updateFilter() {
    if (this.todoLimit !== null) {
      this.filteredTodos = this.todoService.filterTodos(
        this.serverFilteredTodos, {owner: this.todoOwner, body: this.todoContains, category: this.todoCategory}
        ).slice(0, this.todoLimit);
    } else {
      this.filteredTodos = this.todoService.filterTodos(
        this.serverFilteredTodos, {owner: this.todoOwner, body: this.todoContains, category: this.todoCategory});
    }

  }

  public getTodosFromServer() {
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
