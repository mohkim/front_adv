import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Post } from '../../modules/Post';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { Post_status } from 'src/app/modules/Post_status';
import { GlobalConstants } from 'src/app/utility/global-constants';


const AUTH_API = GlobalConstants.serverUrl+'adv/mngt/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ManagmentPostService {
  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService
   ) { 

   }

    getAllPostByStatus(status : String ) {
      return this.http.get<Post[]>(`${AUTH_API}post_status/${status}`, httpOptions)
    }

    getPostByStatusAndId(status : String ,id:number ) {
      return this.http.get<Post>(`${AUTH_API}post_status/${status}/${id}`, httpOptions)
    }

    aceptPost(pid:number) {
      var uid=this.getCurrentUserId()
      return this.http.post(`${AUTH_API}activate_post/${pid}/user/${uid}`, httpOptions)
      
    }
    rejectErrorPost(pid:number,rejection_reason:String) {
      var uid=this.getCurrentUserId()
      return this.http.post(`${AUTH_API}reject_post/${pid}/user/${uid}`,rejection_reason, httpOptions)
    }

    getAllPostRejectedByUser()  {
      var id=this.getCurrentUserId()
      return this.http.get<Post[]>(`${AUTH_API}post_rejected/user/${id}`, httpOptions)
    }
    getAllPostAcceptedByUser() {
      var id=this.getCurrentUserId()
      return this.http.get<Post[]>(`${AUTH_API}post_accepted/user/${id}`, httpOptions)
    }
    getPostByUserId(pid:number) { // to get post   with stattus rejected or approved by user only 
      var uid=this.getCurrentUserId()
      return this.http.get<Post>(`${AUTH_API}post/${pid}/user/${uid}`, httpOptions)
    }

    getCurrentUserId() {
      return this.tokenStorage.getCurrentUserId();
    }
}