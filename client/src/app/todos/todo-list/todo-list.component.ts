import { Component, OnInit } from '@angular/core';
import { Todo, TodoRole } from './../todo';
import { TodoService } from './../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
