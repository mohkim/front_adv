import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/modules/User';
import { AuthenticationService } from 'src/app/service/login/Authentication.service';
import { TokenStorageService } from 'src/app/service/tokenStorage/token-storage.service';
import { Router } from '@angular/router';
import { MatSnackBar, } from '@angular/material/snack-bar/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  public loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  user=new User('','','',-1,null)

  constructor(private authService: AuthenticationService,
              private tokenStorage: TokenStorageService ,
              private router : Router ,
              private snackbar:MatSnackBar) {}

  ngOnInit(): void {
   this.tokenStorage.signOut();   
     this.loginForm = new FormGroup({
          email: new FormControl('', {
            validators: [Validators.required, Validators.email]
          }),
          password: new FormControl('', { validators: [Validators.required] })
        });
 
  }
     onSubmit() {
        this.user.email=this.loginForm.value.email;
        this.user.password=this.loginForm.value.password;
             
        
      this.authService.login(this.user).subscribe(
        data => {
          
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
        
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;

       this.redirectTo('/home')
        
        },
        err => {
           
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this.openSnackBar(this.errorMessage)
        }
      );
    }
    redirectTo(uri:string){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
   }
    openSnackBar( message) {
      this.snackbar.open(message, "Error", {
        duration: 2000,
      });
    }
  }
   
 

 
 