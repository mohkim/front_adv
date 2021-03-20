import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/login/Authentication.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/modules/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  user=new User('','','',-1,null)

  
  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
  }


  onSubmit(form:NgForm) {
 
    if(form.value.password.match(form.value.password2) == null) {
       this.errorMessage="Password MisMatch !!!"
       this.isSignUpFailed=true;
       
    }else {
             this.user.email=form.value.email;
             this.user.password=form.value.password
             this.user.username=form.value.username
             this.user.fullName=form.value.username
             console.log(JSON.stringify(this.user))
      this.authService.register(this.user).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
    }

    
}

 