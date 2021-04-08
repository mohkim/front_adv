import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { GlobalConstants } from "src/app/utility/global-constants";
const AUTH_API = GlobalConstants.serverUrl+'adv/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
 

  constructor(
    private http: HttpClient,
    private userToken:TokenStorageService
  ) {}

 
  login(credentials): Observable<any> {
     return this.http.post(AUTH_API + 'signin', {
      username: "",                  /// refract here 
      email:credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      fullName : user.username
    }, httpOptions);
  }
  forgot(email): Observable<any> {
 
    return this.http.post(AUTH_API + 'forgotpassword', {
      username: " ",
      email: email,
      password: " "
    }, httpOptions);
  }
  newpassword(model,token): Observable<any> {
    
       return this.http.post(AUTH_API + 'newpassword/'+token, {
        email: " ",
        oldPassword: "",
        newPassword: model.password
       }, httpOptions);
     }
     changePassword(model): Observable<any> {
     var id=this.getCurrentUserId()
      return this.http.post(`${AUTH_API}user/${id}/newpassword`, {
       email: " ",
       oldPassword: model.oldPassword,
       newPassword: model.newPassword
      }, httpOptions);
    }
  activate(token): Observable<any> {
    return this.http.get(AUTH_API + 'activate/'+token,  httpOptions);
  }
  getCurrentUserId() {
    return this.userToken.getCurrentUserId();
  }
}
 
