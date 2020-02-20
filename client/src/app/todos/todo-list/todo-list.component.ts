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
  public limit: number;

  //To be done on the server
  public todoStatus: boolean;
  public todoRole: string;
  public orderBy: string;


  constructor( private todoService: TodoService ) {

  }

  public updateFilter() {

  }

  ngOnInit(): void {
  }

}
