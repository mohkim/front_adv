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

  deletePost(id: number) {
    return this.http.delete(AUTH_API + 'post/' + id, httpOptions);
  }

  savePost(post: Post) {
    const id=this.tokenStorage.getUserId();
   return this.http.post<Post>(AUTH_API + 'user/'+id+'/post', post, httpOptions);
  }
 
  editPost(post: Post,postId:Number) {
    const id=this.tokenStorage.getUserId();
   return this.http.post<Post>(AUTH_API + 'user/'+id+'/post/'+postId, post, httpOptions);
  }
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
  // below  reques for image management
  savePostImages(id, files) {
    const formData: FormData = new FormData();
    for (let index = 0; index < files.length; index++) {
      formData.append('files', files[index]);

    }
    const req = new HttpRequest('POST', AUTH_API + 'post/' + id + '/images', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
   }

  getPostImages(id: number) {
    return this.http.get<any>(AUTH_API + 'post/' + id + '/images', httpOptions);
  }

  deleteImage(id: number, name: String) {
    return this.http.delete<any>(AUTH_API + 'post/' + id + '/image/' + name, httpOptions);
  }

}
