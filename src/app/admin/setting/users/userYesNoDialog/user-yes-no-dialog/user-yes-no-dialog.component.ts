import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/modules/User';

@Component({
  selector: 'app-user-yes-no-dialog',
  templateUrl: './user-yes-no-dialog.component.html',
  styleUrls: ['./user-yes-no-dialog.component.css']
})
export class UserYesNoDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UserYesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:User) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
