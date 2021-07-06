import { Component, OnInit, Output ,EventEmitter, OnDestroy } from '@angular/core';
import { TokenStorageService } from 'src/app/service/tokenStorage/token-storage.service';
import { UserService } from 'src/app/service/user/user.service';
import { GlobalConstants } from 'src/app/utility/global-constants';
 
const SERVER_URL = GlobalConstants.serverUrl;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  userImage 
  constructor(private tokenStorage:TokenStorageService,
              private userService:UserService ) { }

  ngOnInit(): void {
    this.setUserInfo();
  }

  async setUserInfo() {
    const s=await   this.userService.getCurrentUser().toPromise();
    console.log("s data =>"+JSON.stringify(s))
      if(s != undefined) {
         
        if(s.image_name=== null) this.userImage = "assets/img/default_user.png"
        else  this.userImage=`${SERVER_URL}adv/img/`+s.image_name   
        
       
      }else{
       
         
        this.userImage = "assets/img/default_user.png"
       
      }

    }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
     
  }

  ngOnDestroy() {
    
  }
  public  userRoleLogedIn(){
  
    return  this.tokenStorage.isRoleAvailable('ROLE_USER')
 }
 public  managerRoleLogedIn(){
  
   return  this.tokenStorage.isRoleAvailable('ROLE_MANAGER')
}
public  adminRoleLogedIn(){
  
  return  this.tokenStorage.isRoleAvailable('ROLE_ADMIN')
}
public  financeRoleLogedIn(){
  
  return  this.tokenStorage.isRoleAvailable('ROLE_FINANCE')
}
public  userLogedIn(){
   return this.tokenStorage.isUserLoggedIn()
}
  
   
}

   
   
  