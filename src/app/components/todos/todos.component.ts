import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Array<any>;
  errors: Array<any>;
  offset: 0;
  isHidden: false;

  constructor(
      private todoService: TodoService,
      private router: Router,
      private authService: AuthService
  ) { }

  ngOnInit(): void {
      this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos: any) => this.todos = todos.data);
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.todoService.addTodo(todo).subscribe(todo => { this.todos.push(todo); this.getTodos(); }, error => {
      this.errors = error.error.errors;
      console.log(this.errors);
    });
  }

  loadMore(count): void {
    this.offset = count;
    this.todoService.loadMoreTodos(this.offset).subscribe(
        async (response: any) => {
            this.isHidden = false;
            this.offset += response.offset;
            const res = response.data;
            res.forEach((value) => {
              this.todos.push(value);
            });
        },
        async error => {
          console.log(error.response);
        }
    );
  }

}
