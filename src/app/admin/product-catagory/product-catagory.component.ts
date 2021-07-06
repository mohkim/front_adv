import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
 
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
 
import { MatDialog } from '@angular/material/dialog';
 
import { CatagoryFormComponent } from './catagoryForm/catagory-form/catagory-form.component';
 
import { MatSnackBar } from '@angular/material/snack-bar';
 
import { ProductCatagory } from 'src/app/modules/ProductCatagory';
import { CatagoyrService } from 'src/app/service/catagory/catagory.service';
import { CatagoryYesNoComponent } from './catagory-yes-no/catagory-yes-no.component';
import { GlobalConstants } from 'src/app/utility/global-constants';
 
const AUTH_API = GlobalConstants.serverUrl+'adv/';

@Component({
  selector: 'app-product-catagory',
  templateUrl: './product-catagory.component.html',
  styleUrls: ['./product-catagory.component.css'],
})
export class ProductCatagoryComponent implements OnInit {
  displayedColumns = ['id','img', 'name', 'Edit','Delete','Sub Catagory'];
  dataSource = new MatTableDataSource<ProductCatagory>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
 

  constructor(
    private catagoryService: CatagoyrService,
    public dialog: MatDialog,
    private snackbar:MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getSourcedata();
  }
  getSourcedata(){
    this.catagoryService.getallProductCatagory().subscribe(
      data=> {
        
        this.dataSource.data =data
      },
      error=>{
        this.snackbar.open("Retrieve Data Fail","error")._dismissAfter(2000)
      }
    );
    
  }
 
  saveCatagory(result:ProductCatagory){
    this.catagoryService.saveProductCatagory(result).subscribe(
      data=> { 
          this.snackbar.open("Catagory Saved Successfully !","Message")._dismissAfter(2000)
          this.getSourcedata()
      },
      error=>{   this.snackbar.open("Catagory save failed !!","error")._dismissAfter(2000)
         
      }
    );
     
  }
   
  deleteOldCatagory(result:ProductCatagory){
    this.catagoryService.deleteProductCatagory(result).subscribe(
      data=> { 
          this.snackbar.open("Catagory Deleted Successfully !!!","Message")._dismissAfter(2000)
          this.getSourcedata()
      },
      error=>{   this.snackbar.open("Catagory Delete failed !!","error")._dismissAfter(2000)
         
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  newCatagory(){
   
    var catagory=new  ProductCatagory(-1,"","","")
    this.openDialog(catagory);
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCatagory(event, id){
  var temp=this.dataSource.data.find(x=>x.id===id)  
  this.deleteDialog(temp);
    
   
  }
  editCat(event, id) {
    var temp=this.dataSource.data.find(x=>x.id===id)  
    this.openDialog(temp);
     
  }

  openDialog( catagory:ProductCatagory): void {
    
    const dialogRef = this.dialog.open(CatagoryFormComponent, {
       width: '500px',
      data: catagory,
    });

    dialogRef.afterClosed().subscribe((result) => {
     
      
      if(result != undefined){
       
            this.saveCatagory(result);
             
      }
    });
  }
  

  deleteDialog(cat:ProductCatagory): void {
    const dialogRef = this.dialog.open(CatagoryYesNoComponent, {
      width: '300px',
      data: cat
    });

    dialogRef.afterClosed().subscribe(result => {
        
       this.deleteOldCatagory(result)
       
    });
  }

  getImageUrl(img:String){
    return AUTH_API+"img/"+img
  }
  openSnackBar( message,type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
}
