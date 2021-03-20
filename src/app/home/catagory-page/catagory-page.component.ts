import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Post } from 'src/app/modules/Post';
import { CatagoyrService } from 'src/app/service/catagory/catagory.service';
import { PostService } from 'src/app/service/post/post.service';

@Component({
  selector: 'app-catagory-page',
  templateUrl: './catagory-page.component.html',
  styleUrls: ['./catagory-page.component.css']
})
export class CatagoryPageComponent implements OnInit {

  catagories
  public  posts: Observable<any>;
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  
  // obs: Observable<any>;
   dataSource: MatTableDataSource<Post> = new MatTableDataSource<Post>();
  constructor(public catService:CatagoyrService,
              public  postService:PostService,
              public snackBar: MatSnackBar,
              private changeDetectorRef: ChangeDetectorRef) { }

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
      this.openSnackBar("couldn't retrieve Posts !!!", "error")
    }

    const p =await  this.catService.getallProductCatagory().toPromise()
    if(p != undefined){
       this.catagories=p
       
    }else {
      this.openSnackBar("couldn't retrieve catagories !!!", "error")
    }


     }
 
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
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
