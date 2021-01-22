import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PostImageDialogComponent } from '../post/post-image-dialog/post-image-dialog.component';
 
 
 
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
 
 // 404 page not found
 // 401 Unauthorized 
  code
 list=['401','404']

  constructor(private route:ActivatedRoute) { }



  ngOnInit(): void {
 
    this.route.queryParams.subscribe(
      result =>{
        this.code=<number>result.code
        if(!this.list.find(x=>x===this.code)){
          this.code='404';
         } 
         },
      
    )
  
  }
  

}