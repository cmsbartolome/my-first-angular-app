import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {toTitleCase} from 'codelyzer/util/utils';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(200)]),
    mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    message: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
  }

  sendForm(): void{
      // console.log(this.form.value);
      this.contactService.send(this.form.value).subscribe(
          async (data: any) => {
              if (data.success) {
                  Swal.fire({
                      text: data.message,
                      icon: 'success'
                  });
              } else {
                  Swal.fire({
                      text: data.message,
                      icon: 'danger'
                  });
              }

              this.form.reset();
          },
          async (error: any) => console.log(error));
    }

}
