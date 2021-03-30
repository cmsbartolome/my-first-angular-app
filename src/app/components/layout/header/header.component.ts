import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  token = '';
  mySubscription: any;
  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {
      this.token = this.authService.getToken();
  }

    // tslint:disable-next-line:typedef
  async logout() {
      Swal.fire({
          title: 'Message',
          text: 'Are you sure to logout this application',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Logout already',
          cancelButtonText: 'No'
      }).then((result) => {
          if (result.value) {
              this.authService.logout().subscribe(
                  async (data: any) => {
                      console.log(data.message);
                  },
                  (error) => {
                      console.log(error);
                  },
                  async () => {
                      await this.router.navigate(['/login']);
                  }
              );
          } else if (result.dismiss === Swal.DismissReason.cancel) { }
      });
  }
}

