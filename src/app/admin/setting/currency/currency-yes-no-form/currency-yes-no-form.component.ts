import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Currency } from 'src/app/modules/Currency';
 

@Component({
  selector: 'app-currency-yes-no-form',
  templateUrl: './currency-yes-no-form.component.html',
  styleUrls: ['./currency-yes-no-form.component.css']
})
export class CurrencyYesNoFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CurrencyYesNoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Currency) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
