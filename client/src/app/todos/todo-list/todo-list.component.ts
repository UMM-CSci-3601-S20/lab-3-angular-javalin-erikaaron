import { Component, OnInit } from '@angular/core';
import { Todo } from './../todo';
import { TodoService } from './../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];

  //To be done in angular
  public todoOwner: string;
  public todoContains: string;
  public todoCategory: string;
  public todoLimit: number;

  //To be done on the server
  public todoStatus: boolean;
  public orderBy: string;


  constructor( private todoService: TodoService ) {

  }

  public updateFilter() {

  }

  public getTodosFromServer() {

  }

  ngOnInit(): void {
  }

}
