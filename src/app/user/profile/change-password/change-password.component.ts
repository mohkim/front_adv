import { Component, OnInit } from '@angular/core';
import {  Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/modules/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordChange } from 'src/app/modules/PasswordChange';
import { AuthenticationService } from 'src/app/service/login/Authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
 
  password=new PasswordChange("","","") 
  form=this.fb.group({
    oldPassword: ["",[Validators.required]],
    newPassword: ["",[Validators.required]],
    newPassword2: ["",[Validators.required]]
   });
  constructor(private  authService:AuthenticationService,
              private fb: FormBuilder,
              private snackbar:MatSnackBar) { }

  ngOnInit(): void {
   
  }
  

  onSubmit(){

     if(this.form.value.newPassword != this.form.value.newPassword2 ){
      this.openSnackBar("New Password MisMatch !!!","Error")
     }else {
       this.authService.changePassword(this.form.value).subscribe(
        reuslt=> {
          this.openSnackBar(JSON.stringify(reuslt.message),"Message")
        },
        error => {  this.openSnackBar(JSON.stringify(error.error.message),"Error")}
      )

     }

    
  }
  openSnackBar( message,type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }

   
}
