import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCatagory } from 'src/app/modules/ProductCatagory';

@Component({
  selector: 'app-role-yes-no-dialog',
  templateUrl: './role-yes-no-dialog.component.html',
  styleUrls: ['./role-yes-no-dialog.component.css']
})
export class RoleYesNoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RoleYesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ProductCatagory) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}