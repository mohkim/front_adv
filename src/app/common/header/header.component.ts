import { Component, OnInit, Output ,EventEmitter, OnDestroy } from '@angular/core';
import { TokenStorageService } from 'src/app/service/tokenStorage/token-storage.service';
 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
    
  constructor(private tokenStorage:TokenStorageService ) { }

  ngOnInit(): void {
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

   
   
  