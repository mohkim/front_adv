import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/login/Authentication.service';
import { TokenStorageService } from 'src/app/service/tokenStorage/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

 
  isSubmitFail = false;
  errorMessage = '';
   token="";
   model:any={
     password:"",
     pass:""
   
   }

  constructor(private authService: AuthenticationService,
              private tokenStorage: TokenStorageService ,
              private  route:ActivatedRoute,
              private router : Router ,
              private snackbar:MatSnackBar) {}

  ngOnInit(): void {
    this.token=this.route.snapshot.params['token']
    console.log("token = "+this.token)
 
  }
     onSubmit() {
        if(this.model.password.match(this.model.pass) == null){
          this.openSnackBar(  "Password Mismatch","Error");
          
       
        } else {
          this.authService.newpassword(this.model,this.token).subscribe(
            data => {
              this.openSnackBar(  "Password Reseted successfully !","Message");
               },
            err => {
              this.errorMessage = err.error.message;
              this.openSnackBar(  this.errorMessage,"Error");
            }
          );
 
           
    }
    }
  
    
    openSnackBar( message,head) {
      this.snackbar.open(message, head, {
        duration: 3000,
      });
    }
}

 