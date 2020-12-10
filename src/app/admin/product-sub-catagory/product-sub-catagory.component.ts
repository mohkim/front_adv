import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubcatagoryService } from 'src/app/service/subcatagory/subcatagory.service';

import { SubCatagoryFormComponent } from './subCatagoryForm/sub-catagory-form/sub-catagory-form.component';
import { SubCatagoryYesNoComponent } from './dialog/sub-catagory-yes-no/sub-catagory-yes-no.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSubCatagory } from 'src/app/modules/ProductSubCatagory';
import { CatagoyrService } from 'src/app/service/catagory/catagory.service';



@Component({
  selector: 'app-product-sub-catagory',
  templateUrl: './product-sub-catagory.component.html',
  styleUrls: ['./product-sub-catagory.component.css']
})
export class ProductSubCatagoryComponent implements OnInit {

  displayedColumns = ['id', 'name', 'Edit', 'Delete', 'go to Post'];
  dataSource = new MatTableDataSource<ProductSubCatagory>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  public cid;
  
 
  public parentCatagoryAvailable: boolean


  constructor(
    private subcatagoryService: SubcatagoryService,
    private catagoryService: CatagoyrService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router

  ) { }



  ngOnInit(): void {
  
    
    this.getSourcedata(); 
 
    }
  async getSourcedata() {
  
    const z=await   this.route.queryParams.subscribe(
      param=>  this.cid=param.cid
      )
 
      const  t=await this.subcatagoryService.getSubcatagoryList(this.cid).toPromise();
       if(t) {
          this.dataSource.data=t 
        
        }
       else  this.snackbar.open("Retrieve Data Fail", "error")._dismissAfter(2000)

       console.log("this.cid=1=>"+this.cid)
     
      //this.router.navigate(['error'])

   
  }



 

  saveSubCatagory(result: ProductSubCatagory) {
    if (result != undefined)
      this.subcatagoryService.saveProductSubCatagory(this.cid, result).subscribe(
        data => {
          this.snackbar.open(" Sub Catagory Saved Successfully !", "Message")._dismissAfter(2000)
          this.getSourcedata()
        },
        error => {
          this.snackbar.open("SubCatagory save failed !!", "error")._dismissAfter(2000)

        }
      );

  }

  deleteOldSubCatagory(result: ProductSubCatagory) {
    if (result != undefined)
      this.subcatagoryService.deleteSubCatagory(result.id).subscribe(
        data => {
          this.snackbar.open(" Sub Catagory Deleted Successfully !!!", "Message")._dismissAfter(2000)
          this.getSourcedata()
        },
        error => {
          this.snackbar.open(" Sub Catagory Delete failed !!", "error")._dismissAfter(2000)

        }
      );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  newSubCatagory() {

    var subcatagory = new ProductSubCatagory(-1,"","PRODUCT",false,false,false,false,false,0,false,0,false,0,false,0,0,0)
    this.openDialog(subcatagory);
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteCatagory(event, id) {
    var temp=this.dataSource.data.find(x=>x.id===id)
    this.deleteDialog(temp); 
    }

  async editCat(event, id) {
     var temp=this.dataSource.data.find(x=>x.id===id)
     this.openDialog(temp);  
 
  }

  openDialog(subCatagory: ProductSubCatagory): void {
    const dialogRef = this.dialog.open(SubCatagoryFormComponent, {
      width: '40%',
      data: subCatagory,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.saveSubCatagory(result);

    });
  }


  deleteDialog(subCat: ProductSubCatagory): void {
    const dialogRef = this.dialog.open(SubCatagoryYesNoComponent, {
      width: '300px',
      data: subCat
    });

    dialogRef.afterClosed().subscribe(result => {

      this.deleteOldSubCatagory(result)

    }


    );
  }
  openSnackBar(message, type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
  goBack(){
    this.router.navigate(['/admin/catagory'])
  }

}
