import { Component, OnInit } from '@angular/core';
import {  Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/modules/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  currentUser=new User("","","",0) 
  form=this.fb.group({
    fullname: [this.currentUser.username,[Validators.required]]
   });
  constructor(private  userService:UserService,
              private fb: FormBuilder,
              private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.getSource()
  }
  async getSource(){
     
   const p=await this.userService.getCurrentUser().toPromise()
   if(p){
     this.currentUser=p
     this.form.patchValue({
      fullname: p.fullName
    })
   }
}

  onSubmit(){
    console.log("Submit Button Clicked")
    this.currentUser.fullName=this.form.value.fullname
    
     this.userService.saveUser(this.currentUser).subscribe(
       reuslt=> {
         this.openSnackBar("User Name Updated Successfully","Message")
       },
       error => { this.openSnackBar("User Name Updated Fail","Error")}
     )
  }
  openSnackBar( message,type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
}


