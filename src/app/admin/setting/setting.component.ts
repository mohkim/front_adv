import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  public  index:number
  constructor() { }

  ngOnInit(): void {
    this.index=2
  }
  
  tabs = ['USER', 'LOCATION', 'PAYMENT'];
  

  addTab(selectAfterAdding: boolean) {
   

  
  }

 
}
