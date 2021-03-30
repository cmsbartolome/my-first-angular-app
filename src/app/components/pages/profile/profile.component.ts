import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fullName = '';
  email = '';
  createdAt = '';
  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.authService.user().subscribe(async data => {
      this.fullName = data.name;
      this.email = data.email;
      // @ts-ignore
      this.createdAt = data.created_at;
    });
  }
}
