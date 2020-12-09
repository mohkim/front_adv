import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesLocation } from 'src/app/modules/SalesLocation';
 

@Component({
  selector: 'app-location-yes-no-form',
  templateUrl: './location-yes-no-form.component.html',
  styleUrls: ['./location-yes-no-form.component.css']
})
export class LocationYesNoFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LocationYesNoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:SalesLocation) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
