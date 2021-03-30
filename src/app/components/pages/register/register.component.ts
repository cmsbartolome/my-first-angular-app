import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token !== null) {
      this.router.navigate(['']);
    }
  }

  // tslint:disable-next-line:typedef
  async registerUser() {
    // console.log(this.form.value);
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe(
          async (data: any) => {
            console.log(data);
            this.form.reset();

            Swal.fire({
              text: data.message,
              icon: (data.type === 'success') ? 'success' : 'error'
            });

          }, async error => {
            Swal.fire({
              text: error.error.message,
              icon: 'error'
            });
            this.form.reset();
          });
    }
  }

}
