import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 
import { FormGroup } from '@angular/forms';
import { SalesLocation } from 'src/app/modules/SalesLocation';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit {
  public catForm: FormGroup;
  constructor( 
   public dialogRef: MatDialogRef<LocationFormComponent>,
   @Inject(MAT_DIALOG_DATA) public data:SalesLocation) {}
 
   ngOnInit(): void {
     
   }
   onNoClick(): void {
     this.dialogRef.close();
   }
 
 }
 