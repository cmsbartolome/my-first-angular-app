import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService: AuthService
  ) {}

  canActivate(): boolean {

    const token = this.authService.getToken();
    if (!token) {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
    }

    // Authorized
    return true;

  }
}
