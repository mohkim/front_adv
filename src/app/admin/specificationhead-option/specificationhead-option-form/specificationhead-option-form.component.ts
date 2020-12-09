import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 
import { FormGroup } from '@angular/forms';
import { SpecificationHeadOption } from 'src/app/modules/SpecificationHeadOption';
 
 

@Component({
  selector: 'app-specificationhead-option-form',
  templateUrl: './specificationhead-option-form.component.html',
  styleUrls: ['./specificationhead-option-form.component.css']
})
export class SpecificationheadOptionFormComponent implements OnInit {
  public catForm: FormGroup;
  constructor( 
   public dialogRef: MatDialogRef<SpecificationheadOptionFormComponent>,
   @Inject(MAT_DIALOG_DATA) public data: SpecificationHeadOption) {}
 
   ngOnInit(): void {
     
   }
   onNoClick(): void {
     this.dialogRef.close();
   }
 
 }
 