import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post/post.service';
import { Post } from 'src/app/modules/Post';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public  posts
  constructor( 
  
              private postService:PostService) { }

  ngOnInit(): void {

   this.postService.getallPostByUser().subscribe(
      result => {
        this.posts=result
        console.log("POSTS => "+JSON.stringify(this.posts))
      },
      error => {
        console.log("POSTS => "+error.error.message)
      }
    )
   
  }
  getUrl(post:Post){
    
  
     return  "http://localhost:8080/adv/post/"+post.id+"/image/"+post.postImage[0].name;
  }

  displayPrice(post:Post){
    if(post.post_payment.option=== "PRICE"){ 
      return  ""+post.post_payment.price_amount+" SSP"
   }else if(post.post_payment.option=== "CONTACT"){
      return  "CONTACT"
 
   }
   else if(post.post_payment.option=== "COMMISSION"){
     return  "COMMISSION"
 
   } else if(post.post_payment.option=== "RANGE"){
      return ""+post.post_payment.min+"-"+post.post_payment.max
   }

}
}
