import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from 'src/app/modules/Address';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
const AUTH_API = 'http://localhost:8080/adv/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AddressService {
   
  constructor(
    private http: HttpClient,
    private userToken: TokenStorageService
  ) { }

  deleteAddress(id: number) {
    return this.http.delete(AUTH_API + 'user/address/' + id, httpOptions);
  }

  saveAddress(address: Address) {
    console.log("address = > "+JSON.stringify(address))
    return this.http.post<Address>(AUTH_API + 'user/'+this.getCurrentUserId()+'/address',address, httpOptions);
  }

  getAddress() {
    return this.http.get<Address>(AUTH_API + 'user/'+this.getCurrentUserId()+'/address', httpOptions);
  }
 
  getCurrentUserId() {
    return this.userToken.getCurrentUserId();
  }
}