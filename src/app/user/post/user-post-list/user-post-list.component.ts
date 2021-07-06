import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
 
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
 
import { MatDialog } from '@angular/material/dialog';
 
 
import { MatSnackBar } from '@angular/material/snack-bar';
  
import { Post } from 'src/app/modules/Post';
import { UserPostService } from 'src/app/service/post/User_post.service';
import { UserService } from 'src/app/service/user/user.service';
import { Post_status } from 'src/app/modules/Post_status';
 
 
 
@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrls: ['./user-post-list.component.css']
})
export class UserPostListComponent implements OnInit {
  displayedColumns = [ 'img', 'title', 'catagory','Status','price','action'];
  dataSource = new MatTableDataSource<Post>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  post_status_list
   status:Post_status

  constructor(
    private postService: UserPostService,
    public dialog: MatDialog,
    private snackbar:MatSnackBar,
    private  userService:UserService,
  ) {}
  ngOnInit(): void {
    this.getSourcedata();
  }
 async getSourcedata(){
  const p=await  this.postService.getallPostByUser().toPromise()
  if(p)  this.dataSource.data =p

  const s=await  this.userService.getPostCatagoryByStatusOfUser().toPromise()
  if(s)this.post_status_list=s;
 }
 async getSourceByStatus(status:string){
   console.log("status data =>"+status)
  const p=await  this.postService.getAllPostByStatus(status).toPromise()
  if(p)  this.dataSource.data =p

  
 }
 
 
  // deleteOldCatagory(result:ProductCatagory){
  //   this.postService.deleteProductCatagory(result).subscribe(
  //     data=> { 
  //         this.snackbar.open("Catagory Deleted Successfully !!!","Message")._dismissAfter(2000)
  //         this.getSourcedata()
  //     },
  //     error=>{   this.snackbar.open("Catagory Delete failed !!","error")._dismissAfter(2000)
         
  //     }
  //   );
  // }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
 
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  getImage(post){
    if(post.postImage.length<1){
      return "assets/img/avatar.png"
    }else {
      return    "http://localhost:8080/adv/img/"+post.postImage[0].name
    }

  }
  getStatus(post){
    return   post.post_status.status
    
  }
  
  getPrice(post) {
    if ( post.post_payment.option === 'PRICE') {
      return '' +  post.post_payment.price_amount +" "+  post.post_payment.price_currency.shortName ;
    } else if ( post.post_payment.option === 'CONTACT') {
      return 'CONTACT';
    } else if ( post.post_payment.option === 'COMMISSION') {
      return 'COMMISSION';
    } else if ( post.post_payment.option === 'RANGE') {
      return '' +  post.post_payment.min + '-' +  post.post_payment.max  +" "+  post.post_payment.range_currency.shortName;
    }
  }
  
  openSnackBar( message,type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
  getCount(status:string){
    var n
    if(status === 'ACTIVE' ){
      n= this.post_status_list.find(x => x.status=== Post_status.active)
      if(n != undefined)  return  n.qty
     return  0
      
    }else if(status==='PENDING' ){
       n= this.post_status_list.find(x => x.status===  Post_status.pending)
      if(n != undefined)  return  n.qty
     return  0
    }else if(status==='DISABLED' ){
             n= this.post_status_list.find(x => x.status=== Post_status.disabled)
            if(n != undefined)  return  n.qty
                return  0
    }else if(status==='SOLD' ){
       n= this.post_status_list.find(x => x.status=== Post_status.sold)
      if(n != undefined)  return  n.qty
          return  0
    }else if(status==='ERROR' ){
       n= this.post_status_list.find(x => x.status=== Post_status.error)
      if(n != undefined)  return  n.qty
          return  0 
    }else if(status==='ALL' ){
       var sum=0
       this.post_status_list.forEach(a => sum += a.qty);
        return  sum
      
    }
}
}
