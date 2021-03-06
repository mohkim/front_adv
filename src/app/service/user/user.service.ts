import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { User } from 'src/app/modules/User';
import { Message } from 'src/app/modules/Message';
import {PostCatagoryByStatus} from 'src/app/modules/PostCatagoryByStatus'
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { GlobalConstants } from 'src/app/utility/global-constants';

const AUTH_API = GlobalConstants.serverUrl+'adv/admin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient,
    private userToken: TokenStorageService
  ) { }

  deleteUser(id: number) {
    return this.http.delete(AUTH_API + 'user/' + id, httpOptions);
  }

  saveUser(usr: User) {
    
    return this.http.post<User>(`${AUTH_API}user`, usr, httpOptions);
  }
 

   saveUserImage(file: File) {
   var id=this.getCurrentUserId()


   const formData: FormData = new FormData();
     
      formData.append('file', file);

    
    const req = new HttpRequest('POST',`${AUTH_API}user/${id}/image`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
     
  }
  

  getUserImageUrl() {
    var id=this.getCurrentUserId()
    
    return this.http.get<Message>(`${AUTH_API}user/${id}/image`, httpOptions);
  }
  getUserImageUrlById(id) {
     
    
    return this.http.get<Message>(`${AUTH_API}user/${id}/image`, httpOptions);
  }
  getallUser() {
    return this.http.get<User[]>(AUTH_API + 'user', httpOptions);
  }
  getUserById(selectedid: number) {
    return this.http.get<User>(AUTH_API + 'user/' + selectedid, httpOptions);
  }
  getUserByEmail(email: String) {
    return this.http.get<User>(`${AUTH_API}user/email/${email}`, httpOptions);
  }
  getCurrentUser() {
    return this.http.get<User>(AUTH_API + 'user/' + this.getCurrentUserId(), httpOptions);
  }
  getPostCatagoryByStatusOfUser() {
    var id=this.getCurrentUserId()

    return this.http.get<PostCatagoryByStatus>(`${AUTH_API}user/${id}/post_catagory_status`, httpOptions);
    
  }
  getCurrentUserId() {
    return this.userToken.getCurrentUserId();
  }
}
