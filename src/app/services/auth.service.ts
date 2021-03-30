import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {from, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // authUrl = 'http://laraionic.test/api/auth',  // apache
  authUrl = 'http://laraionic.test:8080/api/auth'; // nginx
  isLoggedIn = false;
  token: string = null;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.authUrl}/login`, user, httpOptions);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.authUrl}/register`, user, httpOptions);
  }

  // tslint:disable-next-line:typedef
  user() {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + ' ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-XSRF-TOKEN',
      'Access-Control-Allow-Methods' : 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    });

    return this.http.get<User>(`${this.authUrl}/user`, {headers})
        .pipe(
           // map(user => user.name)
            tap(data => {
              return data;
            })
        );

  }

  // tslint:disable-next-line:typedef
  getToken() {
      const token = localStorage.getItem('token') ;
      this.token = token;
      return token;
  }

  // tslint:disable-next-line:typedef
  logout() {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + ' ' + token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-XSRF-TOKEN',
      'Access-Control-Allow-Methods' : 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    });

    return this.http.get(`${this.authUrl}/logout`, {headers})
        .pipe(
            tap(data => {
              localStorage.removeItem('token'); // delete
              this.isLoggedIn = false;
              delete this.token;
              return data;
            })
        );
  }

}
