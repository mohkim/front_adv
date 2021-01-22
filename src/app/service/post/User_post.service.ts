import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Post } from '../../modules/Post';
import { TokenStorageService } from '../tokenStorage/token-storage.service';

const AUTH_API = 'http://localhost:8080/adv/user/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserPostService {
  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {

  }

  getAllPost() {
    var uid = this.getCurrentUserId()
    return this.http.get<Post[]>(`${AUTH_API}post/user/${uid}`, httpOptions)
  }

  getAllPostByStatus(status: String) {
    var uid = this.getCurrentUserId()
    return this.http.get<Post[]>(`${AUTH_API}post_status/${status}/user/${uid}`, httpOptions)
  }

  getPostByIdOfUser(pid: number) {
    var uid = this.getCurrentUserId()
    return this.http.get<Post>(`${AUTH_API}post/${pid}/user/${uid}`, httpOptions)
  }
  savePost(post: Post) {
    const uid = this.tokenStorage.getUserId();
    // return this.http.post<Post>(AUTH_API + 'user/' + id + '/post', post, httpOptions);
    return this.http.post<Post>(`${AUTH_API}user/${uid}/post`, post, httpOptions);
  }

  deleteImage(id: number, name: String) {
    var uid = this.getCurrentUserId()
    // return this.http.delete<any>(AUTH_API + 'post/' + id + '/image/' + name, httpOptions);
    return this.http.delete<any>(`${AUTH_API}post/${id}/image/${name}/user/${uid}`, httpOptions);
  }

  // below  reques for image management
  savePostImages(pid, files) {
    const formData: FormData = new FormData();
    for (let index = 0; index < files.length; index++) {
      formData.append('files', files[index]);

    }
 
    var uid = this.getCurrentUserId()
    const req = new HttpRequest('POST',`${AUTH_API}post/${pid}/images/user/${uid}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deletePost(pid: number) {
    const uid = this.tokenStorage.getUserId();
    // return this.http.delete(AUTH_API + 'post/' + id, httpOptions);
    return this.http.delete(`${AUTH_API}post/${pid}/user/${uid}`, httpOptions);
  }

  editPost(post: Post, pid: Number) {
    const uid = this.tokenStorage.getUserId();
    return this.http.post<Post>(`${AUTH_API}user/${uid}/post/${pid}`, post, httpOptions);
  }
    
  getPostImages(id: number) {
    return this.http.get<any>(AUTH_API + 'post/' + id + '/images', httpOptions);
  }

  getCurrentUserId() {
    return this.tokenStorage.getCurrentUserId();
  }

}