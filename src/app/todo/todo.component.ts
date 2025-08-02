import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo-list/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  constructor() {}
  @Input() todo!: Todo;
  @Output() newItemEvent = new EventEmitter<Todo>();

  toggleTodo(todo: Todo) {
    this.newItemEvent.emit(this.todo);
  }
}
