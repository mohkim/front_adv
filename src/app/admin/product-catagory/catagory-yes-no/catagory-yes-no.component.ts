import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCatagory } from 'src/app/modules/ProductCatagory';
 

@Component({
  selector: 'app-catagory-yes-no',
  templateUrl: './catagory-yes-no.component.html',
  styleUrls: ['./catagory-yes-no.component.css']
})
export class CatagoryYesNoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CatagoryYesNoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ProductCatagory) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}