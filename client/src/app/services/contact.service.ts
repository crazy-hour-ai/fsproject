import { Injectable } from '@angular/core';
import { Contact } from '../data_model/contact';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contact : Contact;

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  postContact ( contact: Contact) {
    return this.http.post<Contact>('/contact', contact, this.httpOption)
    .toPromise();
    // return this.http.get<Contact>('/contact').toPromise();
  }

  getContacts() : Promise<Contact>{
    console.info('>>> getContacts');
    return this.http.get<Contact>('/contact').toPromise();
  }
}
