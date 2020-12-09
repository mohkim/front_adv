import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SpecificationHead } from 'src/app/modules/SpecificationHead';

@Component({
  selector: 'app-specificationhead-yes-no-dialog',
  templateUrl: './specificationhead-yes-no-dialog.component.html',
  styleUrls: ['./specificationhead-yes-no-dialog.component.css']
})
export class SpecificationheadYesNoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SpecificationheadYesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:SpecificationHead) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}