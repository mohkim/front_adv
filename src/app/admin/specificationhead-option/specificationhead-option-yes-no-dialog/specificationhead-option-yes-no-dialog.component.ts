import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SpecificationHeadOption } from 'src/app/modules/SpecificationHeadOption';
import { SpecificationheadOptionComponent } from '../specificationhead-option.component';

@Component({
  selector: 'app-specificationhead-option-yes-no-dialog',
  templateUrl: './specificationhead-option-yes-no-dialog.component.html',
  styleUrls: ['./specificationhead-option-yes-no-dialog.component.css']
})
export class SpecificationheadOptionYesNoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SpecificationheadOptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:SpecificationHeadOption) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}