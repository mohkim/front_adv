import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostImage } from 'src/app/modules/PostImage';

@Component({
  selector: 'app-edit-post-yes-no-dialog',
  templateUrl: './edit-post-yes-no-dialog.component.html',
  styleUrls: ['./edit-post-yes-no-dialog.component.css']
})
export class EditPostYesNoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditPostYesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:PostImage) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}