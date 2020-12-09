import { Injectable } from "@angular/core";

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";

@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  constructor() {}

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(window.sessionStorage.getItem(USER_KEY));
  }
  public getCurrentUserId() {
    return JSON.parse(window.sessionStorage.getItem(USER_KEY)).id;
  }
  public getUserId() {
    return JSON.parse(window.sessionStorage.getItem(USER_KEY)).id;
  }

  public isUserLoggedIn() {
    let cond = window.sessionStorage.getItem(USER_KEY);
    return !(cond === null);
  }
  public isRoleAvailable(role) {
    let u = this.getUser();
      if(u === null)  return false;

    if (u.roles.indexOf(role) > -1) {
      return  true;
    } else {
      
      return false;
    }
  }
}
