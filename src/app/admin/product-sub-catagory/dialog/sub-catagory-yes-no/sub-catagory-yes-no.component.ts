import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductSubCatagory } from 'src/app/modules/ProductSubCatagory';
 

@Component({
  selector: 'app-sub-catagory-yes-no',
  templateUrl: './sub-catagory-yes-no.component.html',
  styleUrls: ['./sub-catagory-yes-no.component.css']
})
export class SubCatagoryYesNoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SubCatagoryYesNoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ProductSubCatagory) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}