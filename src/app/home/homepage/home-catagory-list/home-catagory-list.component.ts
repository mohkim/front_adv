import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CatagoyrService } from 'src/app/service/catagory/catagory.service';

@Component({
  selector: 'app-home-catagory-list',
  templateUrl: './home-catagory-list.component.html',
  styleUrls: ['./home-catagory-list.component.css']
})
export class HomeCatagoryListComponent implements OnInit {

  catagories
  constructor(public catService: CatagoyrService,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.catService.getListOfCatagoryByPost().subscribe(
      result => {
        this.catagories = result
        // console.log("cat==>"+JSON.stringify(this.catagories))
      }, error => {
        this.openSnackBar("Couldn't retrive Catagories!!!", "error")
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
