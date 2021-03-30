import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url = 'http://ionictest.local/api/send-email';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  send(inputs) {
    return this.http.post(this.url, inputs, httpOptions);
  }
}
