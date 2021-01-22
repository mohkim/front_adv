import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/modules/User';
import { AddressService } from 'src/app/service/address/address.service';
import { Address } from 'src/app/modules/Address';
import { UserService } from 'src/app/service/user/user.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  public address
  public  url
  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public addressService: AddressService,
    public  userService:UserService) { }

   async ngOnInit(){
    // this.address = this.addressService.getAddresById(this.data.id)
    this.address=new Address(0,"Haimalakak Street","Juba","Jubek")
  
     
    // retrieve user image 
    this.url=this.data.profile_image.url
  
  }
  isImageNotNull(){
    if(this.url){
      return true;
    }
    else return false ;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}