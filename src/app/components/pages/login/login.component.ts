import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  disable: boolean = false;
  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
      const token = this.authService.getToken();
      if (token) {
          this.router.navigate(['']);
      }
  }

    // tslint:disable-next-line:typedef
  async authenticateUser() {
    // console.log(this.form.value);
      if (this.form.valid) {
          this.disable = true;
          this.authService.login(this.form.value).subscribe(
              async (data: any) => {
                  localStorage.setItem('token', data.token);

                  Swal.fire({
                      text: data.message,
                      icon: (data.type === 'success') ? 'success' : 'error'
                  });

                  this.form.reset();
                  this.disable = false;
                  await this.router.navigate(['']);

              }, async error => {
                  Swal.fire({
                      text: error.error.message,
                      icon: 'error'
                  });
                  this.form.controls.password.reset();
                  this.disable = false;
              });
      }
  }
}
