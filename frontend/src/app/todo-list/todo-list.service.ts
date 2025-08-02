import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoListResponse } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoListResponse> {
    // This method should return an observable of todos
    return this.http.get<TodoListResponse>('https://dummyjson.com/todos');
  }
}
