 
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/modules/Post';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminPostService } from 'src/app/service/post/Admin_post.service';

@Component({
  selector: 'app-admin-postlist',
  templateUrl: './admin-postlist.component.html',
  styleUrls: ['./admin-postlist.component.css']
})
export class AdminPostlistComponent implements OnInit {
  displayedColumns = ['image', 'Subcatagory','Owner','date','detail'];
  dataSource = new MatTableDataSource<Post>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  title:String ;
  title_date;
 

  constructor(
    private admin_post_service: AdminPostService,
    public dialog: MatDialog,
    private snackbar:MatSnackBar
  ) {}
  ngOnInit(): void {

    this.title="PENDING"

    this.getSourcedata(this.title);

  }
  getSourcedata(status:String){
    this.admin_post_service.getAllPostByStatus(status).subscribe(
      data=> {
        
        this.dataSource.data =data
      },
      error=>{
        this.snackbar.open("Retrieve Data Fail","error")._dismissAfter(2000)
      }
    );
    
  }
 async getSourcedataNotPending(status:String){
     const  a=await  this.admin_post_service.getAllPostByStatus(this.title).toPromise()
      if(a)   this.dataSource.data=a
      
    }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }

 
 
  
  openSnackBar( message,type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
  
  getImageUrl(post:Post){
    if(post.postImage.length<1){
      return "assets/img/avatar.png"
    }else {
      return  post.postImage[0].url
    }

  } 
  getDate(post:Post){
    if(this.title==="PENDING"){
     return  post.post_status.apply_date;
    }else  if(this.title==="ACTIVE"){
      return  post.post_status.approved_date;
    }else if(this.title==="ERROR"){
      return  post.post_status.rejected_date;
    }else if(this.title==="DISABLED"){
      return  post.post_status.disabled_date;
    }

  }
  getDateTitle(){
    if(this.title==="PENDING"){
     return  "Apply Date";
    }else  if(this.title==="ACTIVE"){
      return  "Accepted Date";
    }else if(this.title==="ERROR"){
      return  "Rejected Date";
    }else if(this.title==="DISABLED"){
      return  "Disabled Date";
    }

  }

  onStatusChange(ev){
    console.log("status change ")
    if (ev.value) {
       this.title= ev.value;
       this.getSourcedata(this.title)
           }else {
      // console.log("title f ==>"+JSON.stringify(ev.value))
    }
  }
}
