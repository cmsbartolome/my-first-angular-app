import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  completed: number;
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }


  // tslint:disable-next-line:typedef
  setClasses() {
      const classes = {
        todo: true,
        'is-completed': this.todo.completed
      };
      return classes;
  }

  // tslint:disable-next-line:typedef
  onToggle(todo) {
    todo.completed = !todo.completed;
    // tslint:disable-next-line:no-shadowed-variable
    this.todoService.toggleCompleted(todo).subscribe(this.todo = todo);
  }

  // tslint:disable-next-line:typedef
  onDelete(todo) {
    Swal.fire({
      title: 'Message',
      text: 'Are you sure to delete ' + this.todo.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.deleteTodo.emit(todo);
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    });
  }
}
