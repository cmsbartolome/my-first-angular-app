import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  imagesUrl = 'https://picsum.photos/v2/list?page=2&limit=3';
  images: [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.imagesUrl).subscribe(async (images: any) => this.images = images);
  }

}
