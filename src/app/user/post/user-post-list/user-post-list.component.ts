import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
 
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
 
import { MatDialog } from '@angular/material/dialog';
 
 
import { MatSnackBar } from '@angular/material/snack-bar';
  
import { Post } from 'src/app/modules/Post';
import { UserPostService } from 'src/app/service/post/User_post.service';
 
 
 
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
 
 

  constructor(
    private postService: UserPostService,
    public dialog: MatDialog,
    private snackbar:MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getSourcedata();
  }
  getSourcedata(){
    this.postService.getallPostByUser().subscribe(
      data=> {
        
        this.dataSource.data =data
      },
      error=>{
        this.snackbar.open("Retrieve Data Fail","error")._dismissAfter(2000)
      }
    );
    
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

  // deleteCatagory(event, id){
  // var temp=this.dataSource.data.find(x=>x.id===id)  
  // this.deleteDialog(temp);
    
   
  // }
  // editCat(event, id) {
  //   var temp=this.dataSource.data.find(x=>x.id===id)  
  //   this.openDialog(temp);
     
  // }

  // openDialog( catagory:ProductCatagory): void {
    
  //   const dialogRef = this.dialog.open(CatagoryFormComponent, {
  //      width: '500px',
  //     data: catagory,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
     
      
  //     if(result != undefined){
       
  //           this.saveCatagory(result);
             
  //     }
  //   });
  // }
  

  // deleteDialog(cat:ProductCatagory): void {
  //   const dialogRef = this.dialog.open(CatagoryYesNoComponent, {
  //     width: '300px',
  //     data: cat
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
        
  //      this.deleteOldCatagory(result)
       
  //   });
  // }
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
  getPrice(post){
    if ( post.post_payment.option === 'PRICE') {
      return '' +  post.post_payment.price_amount + ' SSP';
    } else if ( post.post_payment.option === 'CONTACT') {
      return 'CONTACT';
    } else if ( post.post_payment.option === 'COMMISSION') {
      return 'COMMISSION';
    } else if ( post.post_payment.option === 'RANGE') {
      return '' +  post.post_payment.min + '-' +  post.post_payment.max;
    }
  }
  openSnackBar( message,type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
}
