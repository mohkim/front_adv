import { Injectable } from "@angular/core";
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
   Router
} from "@angular/router";
import { TokenStorageService } from "../../service/tokenStorage/token-storage.service";

@Injectable({
  providedIn: "root"
})
export class RouteGuardService implements CanActivate {
  constructor( private router:Router,
    private tokenStorage: TokenStorageService
  ) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {  
    
    if (this.tokenStorage.isUserLoggedIn()) {
     
      return true;
    }
    else{
      this.router.navigate(['login'])
       
      return false;
    } 
  }
}
