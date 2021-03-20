import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/service/post/post.service';
import { UserService } from 'src/app/service/user/user.service';

 
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Post } from 'src/app/modules/Post';
import { CatagoyrService } from 'src/app/service/catagory/catagory.service';
 
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  
  uid:number
  user
   posts: Observable<any>;
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
 
  
  
  dataSource: MatTableDataSource<Post> = new MatTableDataSource<Post>();

  constructor(public  postService:PostService,
              public  userService:UserService,
              public  route:Router,
              public  router:ActivatedRoute,
              public snackBar: MatSnackBar,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(
      r=>{      this.uid=r.uid      },
      e=> {  this.route.navigate(['/error']) }  )
     
  
      this.getSource()

   

    }
  async getSource(){
    const  u= await   this.userService.getUserById(this.uid).toPromise()
    if(u) this.user=u
    else   this.route.navigate(['/error'])

    const  p=await  this.postService.getallPostByUser(this.uid).toPromise()
     if(p){

      this.dataSource.data=p 
      this.dataSource.paginator = this.paginator
      this.posts= this.dataSource.connect()
      this.changeDetectorRef.detectChanges();
     }      
    else   this.route.navigate(['/error'])

    // console.log("posts =>"+JSON.stringify(u))

  }

  getImageUrl(post:Post){
    if(post.postImage.length<1){
      return "assets/img/avatar.png"
    }else {
      return    "http://localhost:8080/adv/img/"+post.postImage[0].name
    }

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
 ngOnDestroy() {
  if (this.dataSource) { 
    this.dataSource.disconnect(); 
  }
}                                

}
