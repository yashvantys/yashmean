import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ContactService } from '../services/contact.service'
//declare let google: any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  //title: string = 'MS TECHNOLOGYS PVT LTD';
  //lat: number = 23.2373581;
  //lng: number = 72.62320999999997;
  contactForm: FormGroup;
  error: boolean = false;
  emailSend: boolean = false;


  constructor(private contactFormBuilder: FormBuilder, private contactservice: ContactService) { }

  ngOnInit() {
    this.contactForm = this.contactFormBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      message: ['', [Validators.required]]
    })



  }

  contact() {
    this.contactservice.sendEmail(this.contactForm.value).subscribe(
      data => {
        this.emailSend = true;
        setTimeout(() => {
          this.emailSend = false;
        }, 5000);
        this.contactForm.reset();
      },
      error => {
        this.error = true
      });

  }

}
