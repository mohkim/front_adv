import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostImageDialogComponent } from '../post/post-image-dialog/post-image-dialog.component';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  // 404 page not found
  // 401 Unauthorized 
  code
  list = ['401', '404']


  constructor(private route: ActivatedRoute) { }

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  ngOnInit(): void {

    this.route.queryParams.subscribe(
      result => {
        this.code = <number>result.code
        if (!this.list.find(x => x === this.code)) {
          this.code = '404';
        }
      },

    )

  }
}