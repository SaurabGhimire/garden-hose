import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  constructor(private todoListService: TodoListService) {}

  todos: Todo[] | null = null;
  loading: boolean = false;
  error: string | null = null;

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.loading = true;
    this.error = null;

    this.todoListService.getTodos().subscribe({
      next: (response) => {
        this.todos = response.todos;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load todos. Please try again.';
        this.loading = false;
        console.error('Error fetching todos:', error);
      }
    });
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
  }

  getCompletedCount(): number {
    return this.todos?.filter(todo => todo.completed).length || 0;
  }

  getTotalCount(): number {
    return this.todos?.length || 0;
  }

  trackByFn(index: number, todo: Todo): number {
    return todo.id;
  }
}
