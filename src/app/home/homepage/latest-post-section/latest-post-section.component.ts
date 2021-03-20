import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
 
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/modules/Post';
import { PostService } from 'src/app/service/post/post.service';

@Component({
  selector: 'app-latest-post-section',
  templateUrl: './latest-post-section.component.html',
  styleUrls: ['./latest-post-section.component.css']
})
export class LatestPostSectionComponent implements OnInit {

  //dataSource = new MatTableDataSource<Post>();
  public  posts: Observable<any>;
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  
  // obs: Observable<any>;
   dataSource: MatTableDataSource<Post> = new MatTableDataSource<Post>();
 
  constructor( 
              public  postService:PostService,
              public  route:ActivatedRoute,
              public  router:Router,
               public  snackbar:MatSnackBar,
               public   dialog:MatDialog,
               private changeDetectorRef: ChangeDetectorRef
               ) { }

  ngOnInit(): void {
    this.getSource()

  this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
   this.posts= this.dataSource.connect()
 }

  async  getSource(){
    const s =await  this.postService.getallPost().toPromise()
    if(s != undefined){
       this.dataSource.data=s
       console.log("posst size ==> "+s.length)
    }else {
      this.messageDialog("couldn't retrieve Posts !!!", "error")
    }
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
  messageDialog(msg:string,title:string){
    this.snackbar.open(msg,title,{
       duration:2000
    });
  }
  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

}
