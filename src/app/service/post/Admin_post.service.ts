import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Post } from '../../modules/Post';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
 


const AUTH_API = 'http://localhost:8080/adv/admin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})

export class AdminPostService {
  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService
   ) {    }

    getAllPostByStatus(status : String ) {    
      return this.http.get<Post[]>(`${AUTH_API}post_status/${status}`, httpOptions)
    }
    getPostById(pid : Number ) {    
      return this.http.get<Post>(`${AUTH_API}post/${pid}`, httpOptions)
    }

    enableDisalbePost(pid:number,enable_diable:boolean) {
      var uid=this.getCurrentUserId()
      return this.http.post(`${AUTH_API}disable_post/${pid}/user/${uid}`,enable_diable, httpOptions)
      
    }
    

    getCurrentUserId() {
      return this.tokenStorage.getCurrentUserId();
    }
}