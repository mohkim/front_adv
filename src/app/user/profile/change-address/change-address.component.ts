import { Component, OnInit } from '@angular/core';
import {  Validators, FormBuilder, SelectControlValueAccessor } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/modules/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from 'src/app/modules/Address';
import { AddressService } from 'src/app/service/address/address.service';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.css']
})
export class ChangeAddressComponent implements OnInit {
   addressId
  address=new Address(0,"","","") 
  form=this.fb.group({
    address: [this.address.address,[Validators.required]],
    city: [this.address.city,[Validators.required]],
    state: [this.address.state,[Validators.required]]
   });
  constructor(private  adressService:AddressService,
              private fb: FormBuilder,
              private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.getSource()
  }
  async getSource(){
     
   const p=await this.adressService.getAddress().toPromise()
   console.log("address <= "+JSON.stringify(p))
   if(p != null){
     this.address=p
      this.setValues(p);
   } else {
     this.setValues(this.address);
   }
}

  onSubmit(){
    console.log("Submit Button Clicked")
    this.address=this.form.value
    this.address.id=this.addressId
    // console.log("address = > "+JSON.stringify(this.address))
     this.adressService.saveAddress(this.address).subscribe(
       reuslt=> {
         this.openSnackBar("User Address Updated Successfully","Message")
       },
       error => { this.openSnackBar("User Address Updated Fail","Error")}
     )
  }
  openSnackBar( message,type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }

  setValues(p:Address){
    this.form.patchValue({
      address: p.address,
      city: p.city,
      state: p.state
    })
    this.addressId=p.id
  }
}
