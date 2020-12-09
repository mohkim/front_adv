import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/modules/User';
import { AddressService } from 'src/app/service/address/address.service';
import { Address } from 'src/app/modules/Address';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  public address
  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public addressService: AddressService) { }

  ngOnInit(): void {
    // this.address = this.addressService.getAddresById(this.data.id)
    this.address=new Address(0,"Haimalakak Street","Juba","Jubek")
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}