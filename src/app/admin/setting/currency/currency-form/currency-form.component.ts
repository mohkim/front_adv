import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Currency } from 'src/app/modules/Currency';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.css']
})
export class CurrencyFormComponent implements OnInit {
  public catForm: FormGroup;
  constructor( 
   public dialogRef: MatDialogRef<CurrencyFormComponent>,
   @Inject(MAT_DIALOG_DATA) public data: Currency) {}
 
   ngOnInit(): void {
     
   }
   onNoClick(): void {
     this.dialogRef.close();
   }
 
 }
 