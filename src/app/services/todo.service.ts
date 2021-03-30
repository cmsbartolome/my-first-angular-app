import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Todo } from '../models/Todo';
import {Observable} from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // todosUrl = 'http://laraionic.test/api/todos',  // apache
  todosUrl = 'http://laraionic.test:8080/api/todos'; // nginx

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getTodos(): Observable<Todo[]> {
      return this.http.get<Todo[]>(this.todosUrl);
  }

  toggleCompleted(todo: Todo): Observable<any> {
    const url  = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url  = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  loadMoreTodos(offset): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods' : 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-XSRF-TOKEN, Origin, Accept, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
    });
    return this.http.get('http://laraionic.test:8080/api/auth/todos/load-more-todo?' + 'offset=' + offset, {headers});
  }
}
