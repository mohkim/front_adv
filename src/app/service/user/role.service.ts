import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
 
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { Role } from 'src/app/modules/Role';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { GlobalConstants } from 'src/app/utility/global-constants';

const AUTH_API = GlobalConstants.serverUrl+'adv/admin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient,
    private userToken: TokenStorageService
  ) { }

  deleteRole(id: number) {
    return this.http.delete(AUTH_API + 'role/' + id, httpOptions);
  }
 

  saveRole(r: Role) {
    
    return this.http.post<Role>(`${AUTH_API}role`, r, httpOptions);
  }
 
 
  getallRole() {
    return this.http.get<Role[]>(AUTH_API + 'role', httpOptions);
  }
  getAllUserRole(id) {

    return this.http.get<Role[]>(`${AUTH_API}user/${id}/role`, httpOptions);
  }
  getRoleById(selectedid: number) {
    return this.http.get<Role>(AUTH_API + 'role/' + selectedid, httpOptions);
  }
  deleteUserRole(id:number ,rid:number) {
    
    
    return this.http.delete<Message>(`${AUTH_API}user/${id}/role/${rid}`, httpOptions);
  }
  addUserRole(id:number ,rid:number) {
    
    
    return this.http.get<Message>(`${AUTH_API}user/${id}/role/${rid}`, httpOptions);
  }
 
   
}
