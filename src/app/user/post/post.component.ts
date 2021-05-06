import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post/post.service';
import { Post } from 'src/app/modules/Post';
import { MatDialog } from '@angular/material/dialog';
import { UserPostService } from 'src/app/service/post/User_post.service';
import { User } from 'src/app/modules/User';
import { UserService } from 'src/app/service/user/user.service';
import { GlobalConstants } from 'src/app/utility/global-constants';

const SERVER_URL = GlobalConstants.serverUrl;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

 
export class PostComponent implements OnInit {
 
 
  userImage:String
  userName:String
  user:User
    constructor(public  userService:UserService) { }
  
    ngOnInit(): void {
      this.setUserInfo()
    }
  
  
    async setUserInfo() {
      const s=await   this.userService.getCurrentUser().toPromise();
      console.log("s data =>"+JSON.stringify(s))
        if(s != undefined) {
          if(s.image_name=== null) this.userImage = "assets/img/default_user.png"
          else  this.userImage=`${SERVER_URL}adv/img/`+s.image_name         
           this.userName=s.fullName
        }else{
         
          this.userName=""
          this.userImage = "assets/img/default_user.png"
         
        }
  
      }
  
  }
  




//   public  posts
//   constructor( 
  
//               private postService:UserPostService) { }

//   ngOnInit(): void {

//    this.postService.getallPostByUser().subscribe(
//       result => {
//         this.posts=result
//         console.log("POSTS => "+JSON.stringify(this.posts))
//       },
//       error => {
//         console.log("POSTS => "+error.error.message)
//       }
//     )
   
//   }
//   getUrl(post:Post){
    
  
//      return  "http://localhost:8080/adv/post/"+post.id+"/image/"+post.postImage[0].name;
//   }

//   displayPrice(post:Post){
   
//       if (post.post_payment.option === 'PRICE') {
//         return '' + post.post_payment.price_amount + " "+post.post_payment.price_currency.shortName;
//       } else if (post.post_payment.option === 'CONTACT') {
//         return 'CONTACT';
//       } else if (post.post_payment.option === 'COMMISSION') {
//         return 'COMMISSION';
//       } else if (post.post_payment.option === 'RANGE') {
//         return '' + post.post_payment.min+ " "+post.post_payment.price_currency.shortName + '-' + post.post_payment.max+ " "+post.post_payment.price_currency.shortName;
//       } 
//     }


// }
