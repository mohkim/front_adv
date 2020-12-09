import { Component, OnInit } from '@angular/core';
import {  Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/modules/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from 'src/app/modules/Contact';
import { ContactService } from 'src/app/service/contact/contact.service';

@Component({
  selector: 'app-change-phone',
  templateUrl: './change-phone.component.html',
  styleUrls: ['./change-phone.component.css']
})
export class ChangePhoneComponent implements OnInit {

  userContact=new Contact("") 
  form=this.fb.group({
     phone: [this.userContact.phone,[Validators.required]]
   });
  constructor(private  contactService:ContactService,
              private fb: FormBuilder,
              private snackbar:MatSnackBar) { }
 
  ngOnInit(): void {
    this.getSource()
  }
  async getSource(){
     
   const p=await this.contactService.getContact().toPromise()
   if(p){
     this.userContact=p
     this.form.patchValue({
      phone: p.phone
    })
   }
}

  onSubmit(){
    console.log("Submit Button Clicked")
    this.userContact.phone=this.form.value.phone
 
     this.contactService.saveContact(this.userContact).subscribe(
       result=> {
         this.userContact.phone=result.phone
         this.openSnackBar( "Phone Updated Successfully !!","Message")
       },
       error => { this.openSnackBar("Phone updated Fail","Error")}
     )
  }
  openSnackBar( message,type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
}


