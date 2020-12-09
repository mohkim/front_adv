import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-post-image-dialog',
  templateUrl: './post-image-dialog.component.html',
  styleUrls: ['./post-image-dialog.component.css']
})
export class PostImageDialogComponent implements OnInit {

 

  ngOnInit(): void {
  }
  constructor(
    public dialogRef: MatDialogRef<PostImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
