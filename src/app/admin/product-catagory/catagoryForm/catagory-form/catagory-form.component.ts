import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 
import { FormGroup } from '@angular/forms';
import { ProductCatagory } from 'src/app/modules/ProductCatagory';

@Component({
  selector: 'app-catagory-form',
  templateUrl: './catagory-form.component.html',
  styleUrls: ['./catagory-form.component.css']
})
export class CatagoryFormComponent implements OnInit {
  public catForm: FormGroup;
 constructor( 
  public dialogRef: MatDialogRef<CatagoryFormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: ProductCatagory) {}

  ngOnInit(): void {
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
