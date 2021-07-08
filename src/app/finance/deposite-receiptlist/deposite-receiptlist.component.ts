import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepositReciept } from 'src/app/modules/DepositReciept';
import { DepositeReceiptServiceService } from 'src/app/service/depositeSerivce/deposite-receipt-service.service';
import { TokenStorageService } from 'src/app/service/tokenStorage/token-storage.service';

@Component({
  selector: 'app-deposite-receiptlist',
  templateUrl: './deposite-receiptlist.component.html',
  styleUrls: ['./deposite-receiptlist.component.css']
})
export class DepositeReceiptlistComponent implements OnInit {
  displayedColumns = ['id','customerName', 'Amount', 'Date'];
  dataSource = new MatTableDataSource<DepositReciept>();

  total=0
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  // range = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl()
  // });
 

  constructor(
    private deposteReciptService: DepositeReceiptServiceService,
    public dialog: MatDialog,
    private snackbar:MatSnackBar,
 
  ) {}
  ngOnInit(): void {
    this.getSourcedata();
  }
  getSourcedata(){
    this.deposteReciptService.getAllDepositeReceiptByCasher().subscribe(
      data=> {
        
        this.dataSource.data =data
       this.setTotal()
      },
      error=>{
        this.snackbar.open("Retrieve Data Fail","error")._dismissAfter(2000)
      }
    );
    
  }
 
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
 
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  setTotal(){
    this.dataSource.data.forEach(element => {
      this.total=this.total+element.amount
    });
  }
}
