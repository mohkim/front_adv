import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
 
 
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/modules/Post';
import { ManagmentPostService } from 'src/app/service/post/Manag_post.service';
 

@Component({
  selector: 'app-mg-post-list',
  templateUrl: './mg-post-list.component.html',
  styleUrls: ['./mg-post-list.component.css']
})
export class MgPostListComponent implements OnInit {
  displayedColumns = ['image', 'Subcatagory','Owner','date','detail'];
  dataSource = new MatTableDataSource<Post>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  title:String ;
  title_date;
 

  constructor(
    private mana_post_service: ManagmentPostService,
    public dialog: MatDialog,
    private snackbar:MatSnackBar
  ) {}
  ngOnInit(): void {

    this.title="PENDING"

    this.getSourcedata(this.title);

  }
  getSourcedata(status:String){
    this.mana_post_service.getAllPostByStatus(status).subscribe(
      data=> {
        
        this.dataSource.data =data
      },
      error=>{
        this.snackbar.open("Retrieve Data Fail","error")._dismissAfter(2000)
      }
    );
    
  }
 async getSourcedataNotPending(status:String){
 
       
    if(this.title==="ACTIVE"){
      const  a=await  this.mana_post_service.getAllPostAcceptedByUser().toPromise()
      if(a)   this.dataSource.data=a
   }else if(this.title==="ERROR"){
    const  r=await  this.mana_post_service.getAllPostRejectedByUser().toPromise()
    if(r)   this.dataSource.data=r
   }
  
    
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
    }

  }
  getDateTitle(){
    if(this.title==="PENDING"){
     return  "Apply Date";
    }else  if(this.title==="ACTIVE"){
      return  "Accepted Date";
    }else if(this.title==="ERROR"){
      return  "Rejected Date";
    }

  }

  onStatusChange(ev){
    console.log("status change ")
    if (ev.value) {
       this.title= ev.value;
       
       if(this.title==="PENDING"){
        this.getSourcedata(this.title)
       }else  if(this.title==="ACTIVE"){
        this.getSourcedataNotPending(this.title)
       }else if(this.title==="ERROR"){
        this.getSourcedataNotPending(this.title)
       }

    }else {
      console.log("title f ==>"+JSON.stringify(ev.value))
    }
  }
}
