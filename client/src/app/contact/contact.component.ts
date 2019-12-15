import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact, CONTACT_TYPE } from '../data_model/contact';

import { ContactService } from '../services/contact.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('cform', { static: false }) contactFormDirective;

  contactFormGroup: FormGroup;
  contact: Contact;
  contactType = CONTACT_TYPE;

  feedback: Contact;
  submitted = null;
  showForm = true;
  submittedresult = {
    firstname: '',
    lastname: '',
    tel: '',
    email: '',
    agree: '',
    message: '',
    contacttype: ''
  };

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.createForm()
  }

  ngOnInit() {
  }

  createForm() {
    this.contactFormGroup = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', Validators.required],
      agree: 'false',
      message: '',
      contacttype: ''
    });
  }

  onSubmit() {
    this.contact = this.contactFormGroup.value;
    console.log(this.contact);

    this.showForm = false;

    this.contactService.postContact(this.contact)
      .then(result => {
        console.log("Feedback submitted: ", result);
        this.submitted = result;

        this.feedback = null;
        setTimeout(() => { this.submitted = null; this.showForm = true; }, 10000);
      })
      .catch(
        error => console.log(error.status, error.message)
      );

    this.contactService.getContacts()
      .then(result => {
        console.log("Feedback submitted:>>> ", result);
        this.submittedresult = result[0];
      });

    this.contactFormGroup.reset({
      firstname: '',
      lastname: '',
      tel: '',
      email: '',
      agree: 'false',
      message: '',

      contacttype: ''
    });
    this.contactFormDirective.resetForm();
  }
}
