import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesLocation } from 'src/app/modules/SalesLocation';
import { LocationService } from 'src/app/service/location/Sales_location.service';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationYesNoFormComponent } from './location-yes-no-form/location-yes-no-form.component';
 

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  displayedColumns = ['id', 'city','state','country','Edit','Delete'];
  dataSource = new MatTableDataSource<SalesLocation>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public  selectedSalesLocation:SalesLocation=null
 

  constructor(
    private  salesLocationService:LocationService ,
    public dialog: MatDialog,
    private snackbar:MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getSourcedata();
  }
  getSourcedata(){
    this.salesLocationService.getallSalesLocation().subscribe(
      data=> {
         
        this.dataSource.data =data
      },
      error=>{
        this.snackbar.open("Retrieve Data Fail","error")._dismissAfter(2000)
      }
    );
    
  }
  

  saveSalesLocation(result:SalesLocation){
    this.salesLocationService.saveSalesLocation(result).subscribe(
      data=> { 
          this.snackbar.open("SalesLocation Saved Successfully !","Message")._dismissAfter(2000)
          this.getSourcedata()
      },
      error=>{   this.snackbar.open("SalesLocation save failed !!","error")._dismissAfter(2000)
         
      }
    );
     
  }
   
  deleteOldSalesLocation(result:SalesLocation){
    this.salesLocationService.deleteSalesLocation(result.id).subscribe(
      data=> { 
          this.snackbar.open("SalesLocation Deleted Successfully !!!","Message")._dismissAfter(2000)
          this.getSourcedata()
      },
      error=>{   this.snackbar.open("SalesLocation Delete failed !!","error")._dismissAfter(2000)
         
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  newSalesLocation(){
   
    var salesLocation=new  SalesLocation(-1,"","","")
    this.openDialog(salesLocation);
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSalesLocation(event, id){
    var temp=this.dataSource.data.find(x=>x.id===id)  
    this.deleteDialog(temp);
    
  }
  editSalesLocation(event, id) {
  
    var temp=this.dataSource.data.find(x=>x.id===id)  
    this.openDialog(temp);
    
  }

  openDialog( salesLocation:SalesLocation): void {
    
    const dialogRef = this.dialog.open(LocationFormComponent, {
      width: '80%',
      data: salesLocation,
    });

    dialogRef.afterClosed().subscribe((result) => {
     
      
      if(result != undefined){
       
            this.saveSalesLocation(result);
             
      }
    });
  }
  

  deleteDialog(cat:SalesLocation): void {
    const dialogRef = this.dialog.open(LocationYesNoFormComponent, {
      width: '300px',
      data: cat
    });

    dialogRef.afterClosed().subscribe(result => {
        
       this.deleteOldSalesLocation(result)
       
    });
  }
  openSnackBar( message,type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
}
