import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/modules/Post';
import { ProductCatagory } from 'src/app/modules/ProductCatagory';
import { CatagoyrService } from 'src/app/service/catagory/catagory.service';
import { PostService } from 'src/app/service/post/post.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  public  catagorys 
  public  posts

  constructor(public  catagoryService:CatagoyrService,
              public  postService:PostService,
              public  route:ActivatedRoute,
              public  router:Router,
               public  snackbar:MatSnackBar,
               public   dialog:MatDialog,
               ) { }

  ngOnInit(): void {
    this.catagoryService.getallProductCatagory().subscribe(
      result =>{
        this.catagorys=result
        console.log("catagories=> "+JSON.stringify(this.catagorys))
      },
      error=>{
        this.messageDialog("Couldn't retrieve catagory !!!","error")

      }
    )

    this.postService.getallPost().subscribe(
      result =>{
        this.posts=result
        console.log(" active posts=> "+JSON.stringify(this.posts))
      },
      error=>{
    this.messageDialog("couldn't retrieve Posts !!!", "error")

      }
    )
    
  
  }
  getImageUrl(post:Post){
    if(post.postImage.length<1){
      return "assets/img/avatar.png"
    }else {
      return  post.postImage[0].url
    }

  }
  messageDialog(msg:string,title:string){
    this.snackbar.open(msg,title,{
       duration:2000
    });
  }

}
