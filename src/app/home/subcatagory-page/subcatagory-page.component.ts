import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/modules/Post';
 
import { PostService } from 'src/app/service/post/post.service';
import { SubcatagoryService } from 'src/app/service/subcatagory/subcatagory.service';

@Component({
  selector: 'app-subcatagory-page',
  templateUrl: './subcatagory-page.component.html',
  styleUrls: ['./subcatagory-page.component.css']
})
export class SubcatagoryPageComponent implements OnInit {

  subCatagories
  cid:number
  public  posts: Observable<any>;
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  
  // obs: Observable<any>;
   dataSource: MatTableDataSource<Post> = new MatTableDataSource<Post>();
  constructor(public scatService:SubcatagoryService,
              public  postService:PostService,
              public snackBar: MatSnackBar,
              public router:ActivatedRoute,
              public  route:Router,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
      this.router.queryParams.subscribe(
        result=>{
          this.cid=result.cid
          console.log("result =>"+JSON.stringify(result))
        },error => {
           
          this.route.navigate(['/error'])

        }
      )
    this.getSource()

    this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
     this.posts= this.dataSource.connect()

 
   
  }
  async  getSource(){
    const s =await  this.postService.getPostBySubCat(this.cid).toPromise()
    if(s != undefined){
       this.dataSource.data=s
      //  console.log("posst size ==> "+s.length)
    }else {
      this.openSnackBar("couldn't retrieve Posts !!!", "error")
    }

    const p =await  this.scatService.getSubcatagoryList(this.cid).toPromise()
    if(p != undefined){
        console.log("out put data => "+JSON.stringify(p))
        if(p.length>0){
          this.subCatagories=p
         } else   this.route.navigate(['/error'])
       }else {
      this.route.navigate(['/error'])    ///catagory not found 
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
