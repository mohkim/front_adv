import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
 
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
 
import { MatDialog } from '@angular/material/dialog';
import { Currency } from 'src/app/modules/Currency';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyFormComponent } from './currency-form/currency-form.component';
import { CurrencyYesNoFormComponent } from './currency-yes-no-form/currency-yes-no-form.component';
import { CurrencyService } from 'src/app/service/currency/currency.service';
 

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  displayedColumns = ['id', 'longName',  'shortName',  'Edit','Delete'];
  dataSource = new MatTableDataSource<Currency>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
 

  constructor(
    private catagoryService: CurrencyService,
    public dialog: MatDialog,
    private snackbar:MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getSourcedata();
  }
  getSourcedata(){
    this.catagoryService.getallCurrency().subscribe(
      data=> {
         
        this.dataSource.data =data
      },
      error=>{
        this.snackbar.open("Retrieve Data Fail","error")._dismissAfter(2000)
      }
    );
    
  }
  
    
 
 

  saveCurrency(result:Currency){
    this.catagoryService.saveCurrency(result).subscribe(
      data=> { 
          this.snackbar.open("Currency Saved Successfully !","Message")._dismissAfter(2000)
          this.getSourcedata()
      },
      error=>{   this.snackbar.open("Currency save failed !!","error")._dismissAfter(2000)
         
      }
    );
     
  }
   
  deleteOldCurrency(result:Currency){
    this.catagoryService.deleteCurrency(result.id).subscribe(
      data=> { 
          this.snackbar.open("Currency Deleted Successfully !!!","Message")._dismissAfter(2000)
          this.getSourcedata()
      },
      error=>{   this.snackbar.open("Currency Delete failed !!","error")._dismissAfter(2000)
         
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  newCurrency(){
   
    var catagory=new  Currency(-1,"","")
    this.openDialog(catagory);
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCurrency(event, id){
    var temp=this.dataSource.data.find(x=>x.id===id)  
    this.deleteDialog(temp);
    
   
  }
  editCur(event, id) {
    var temp=this.dataSource.data.find(x=>x.id===id)  
    this.openDialog(temp);
    }

  openDialog( catagory:Currency): void {
    
    const dialogRef = this.dialog.open(CurrencyFormComponent, {
      width: '80%',
      data: catagory,
    });

    dialogRef.afterClosed().subscribe((result) => {
     
      
      if(result != undefined){
       
            this.saveCurrency(result);
             
      }
    });
  }
  

  deleteDialog(cat:Currency): void {
    const dialogRef = this.dialog.open(CurrencyYesNoFormComponent, {
      width: '300px',
      data: cat
    });

    dialogRef.afterClosed().subscribe(result => {
        
       this.deleteOldCurrency(result)
       
    });
  }
  openSnackBar( message,type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
}
