import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/login/Authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  email=""
  errormessage=""
  submitted=false
  error=false

  constructor(private authService:AuthenticationService,
               private   snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(){
   
    this.authService.forgot(this.email).subscribe(
      data => {
     this. submitted = true;
      this.error=false;
      this.openSnackBar("Account reset Link sent to your Email !!","Message")
      },
      err => {
        this. submitted =false ;
        this.error=true
        this.errormessage= err.error.message;
        this.openSnackBar(this.errormessage,"Error")
     }
    );
  }
  openSnackBar( message,head) {
    this.snackbar.open(message, head, {
      duration: 3000,
    });
  }

}
