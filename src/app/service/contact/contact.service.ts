import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { Contact } from 'src/app/modules/Contact';
import { GlobalConstants } from 'src/app/utility/global-constants';
const AUTH_API = GlobalConstants.serverUrl+'adv/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient,
    private userToken: TokenStorageService
  ) { }

  deleteContact(id: number) {
    return this.http.delete(AUTH_API + 'user/contact/' + id, httpOptions);
  }

  saveContact(contact : Contact) {
    console.log("contact  = > "+JSON.stringify(contact ))
    return this.http.post<Contact>(AUTH_API + 'user/'+this.getCurrentUserId()+'/contact',contact, httpOptions);
  }

  getContact() {
    return this.http.get<Contact>(AUTH_API + 'user/'+this.getCurrentUserId()+'/contact', httpOptions);
  }
 
  getCurrentUserId() {
    return this.userToken.getCurrentUserId();
  }
}