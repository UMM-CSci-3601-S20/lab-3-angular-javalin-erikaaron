import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../todo.service';
import { MockTodoService } from '../../../testing/todo.service.mock';
import { Todo } from '../todo';



const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [ TodoListComponent ],
      providers: [{ provide: TodoService, useValue: new MockTodoService() }]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains all the users', () => {
    expect(component.serverFilteredTodos.length).toBe(4);
  });

  it('contains a todo owned by \'blanche\'', () => {
    expect(component.serverFilteredTodos.some((todo: Todo) => todo.owner === 'blanche')).toBe(true);
  });

  it('contain a todo owned by \'dorothy\'', () => {
    expect(component.serverFilteredTodos.some((todo: Todo) => todo.owner === 'dorothy')).toBe(true);
  });

  it('doesn\'t contain a todo owned by \'santa\'', () => {
    expect(component.serverFilteredTodos.some((todo: Todo) => todo.owner === 'santa')).toBe(false);
  });

  it('has two todos whose status is true', () => {
    expect(component.serverFilteredTodos.filter((todo: Todo) => todo.status === true).length).toBe(2);
  });
});
