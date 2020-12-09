import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
 import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
 import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecificationHeadOption } from 'src/app/modules/SpecificationHeadOption';
import { SpecificationHeadOptionervice } from 'src/app/service/specificationHeadOption/specification-head-option.service';
 import { SpecificationheadOptionYesNoDialogComponent } from './specificationhead-option-yes-no-dialog/specificationhead-option-yes-no-dialog.component';
 import {SpecificationheadOptionFormComponent} from '../specificationhead-option/specificationhead-option-form/specificationhead-option-form.component'
 
 
@Component({
  selector: 'app-specificationhead-option',
  templateUrl: './specificationhead-option.component.html',
  styleUrls: ['./specificationhead-option.component.css']
})
export class SpecificationheadOptionComponent implements OnInit {
  displayedColumns = ['id', 'item', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<SpecificationHeadOption>();
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  public sid: number;
  public cid: number;
  public scid: number;
  
  public selectedSpecificationHead: SpecificationHeadOption;
  public parentCatagoryAvailable: boolean


  constructor(
    private specHeadOptionService: SpecificationHeadOptionervice,
    private speciHeadOptService: SpecificationHeadOptionervice,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router

  ) { }



  ngOnInit(): void {

    this.route.queryParams.subscribe(
      param => {
        this.cid = param.cid
        this.scid = param.scid
        this.sid=param.sid
      })

  console.log("this.cid ==>"+this.cid)
  console.log("this.scid ==>"+this.scid)
  console.log("this.sid ==>"+this.sid)
    this.getSourcedata();

  }
  async getSourcedata() {
    const z=await   this.route.queryParams.subscribe(
      param=> {
       this.cid=param.cid
       this.scid=param.scid 
       this.sid=param.sid
   }   )
     
      this.specHeadOptionService.getallSpecificationheadOption(this.sid).subscribe(
        data => {
          this.dataSource.data = data
          console.log("option ==> "+JSON.stringify(data))
        },
        error => {
          this.snackbar.open("Retrieve Data Fail", "error")
        }
      )
    
    
  }

 

  saveSpecificationHeadOption(result: SpecificationHeadOption) {
    if(result != undefined)
    this.specHeadOptionService.saveSpecificationheadOption(this.sid, result).subscribe(
      data => {
        this.snackbar.open(" Option Saved Successfully !", "Message")._dismissAfter(2000)
        this.getSourcedata()
      },
      error => {
        this.snackbar.open("Option save failed !!", "error")._dismissAfter(2000)

      }
    );

  }

  deleteOldSpecificationHeadOption(result: SpecificationHeadOption) {
  if(result != undefined)
    this.specHeadOptionService.deleteSpecificationheadOption(result.id).subscribe(
      data => {
        this.snackbar.open(" Option Deleted Successfully !!!", "Message")._dismissAfter(2000)
        this.getSourcedata()
      },
      error => {
        this.snackbar.open(" Option Delete failed !!", "error")._dismissAfter(2000)

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

 async deleteOption(event, id) {
  var temp=this.dataSource.data.find(x=>x.id==id)
  this.deleteDialog(temp);
 

  }
   editOption(event, id) {
  var temp=this.dataSource.data.find(x=>x.id==id)
  this.openDialog(temp);
 
  
  
  }
  newOption(){
   
    var opt=new  SpecificationHeadOption(-1,"")
    this.openDialog(opt);
  }

  openDialog(speHedOption: SpecificationHeadOption): void {
 const dialogRef = this.dialog.open(SpecificationheadOptionFormComponent, {
      width: '80%',
      data: speHedOption,
    });

    dialogRef.afterClosed().subscribe((result) => {
       this.saveSpecificationHeadOption(result);
   
    });
  }


  deleteDialog(subCat: SpecificationHeadOption): void {
    const dialogRef = this.dialog.open(SpecificationheadOptionYesNoDialogComponent, {
      width: '300px',
      data: subCat
    });

    dialogRef.afterClosed().subscribe(result => {

      this.deleteOldSpecificationHeadOption(result)

    }
    
    
    );
  }
  openSnackBar(message, type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }

}
