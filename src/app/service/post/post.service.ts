import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
 
import { Post } from '../../modules/Post';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { JsonPipe } from '@angular/common';
 
const AUTH_API = 'http://localhost:8080/adv/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient,
              private  tokenStorage: TokenStorageService) { }

 
  getallPost() {
    return this.http.get<Post[]>(AUTH_API + 'post', httpOptions);
  }
  getallPostByUser() {
    const id=this.tokenStorage.getUserId();
    return this.http.get<Post[]>(AUTH_API + 'user/' + id+'/post', httpOptions);
  }
  getPostById(selectedid: number) {
    return this.http.get<Post>(AUTH_API + 'post/' + selectedid, httpOptions);
  }
  
  
  getPostImages(id: number) {
    return this.http.get<any>(AUTH_API + 'post/' + id + '/images', httpOptions);
  }

  

}
