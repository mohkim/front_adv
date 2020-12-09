import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 
import { FormGroup } from '@angular/forms';
import { ProductSubCatagory } from 'src/app/modules/ProductSubCatagory';
 

@Component({
  selector: 'app-sub-catagory-form',
  templateUrl: './sub-catagory-form.component.html',
  styleUrls: ['./sub-catagory-form.component.css']
})
export class SubCatagoryFormComponent implements OnInit {
  public catForm: FormGroup;
  constructor( 
   public dialogRef: MatDialogRef<SubCatagoryFormComponent>,
   @Inject(MAT_DIALOG_DATA) public data: ProductSubCatagory) {}
 
   ngOnInit(): void {
     
   }
   onNoClick(): void {
     this.dialogRef.close();
   }
 
 }
 