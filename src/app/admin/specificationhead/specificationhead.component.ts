import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecificationHead } from 'src/app/modules/SpecificationHead';
import { SpecificaitonHeadService } from 'src/app/service/specificationHead/SpecificaitonHeadService';
import { SubcatagoryService } from 'src/app/service/subcatagory/subcatagory.service';
import { SpecificationheadYesNoDialogComponent } from './specificationhead-yes-no-dialog/specificationhead-yes-no-dialog.component';


@Component({
  selector: 'app-specificationhead',
  templateUrl: './specificationhead.component.html',
  styleUrls: ['./specificationhead.component.css']
})
export class SpecificationheadComponent implements OnInit {
  displayedColumns = ['id', 'label', 'Edit', 'Delete', 'go to Post'];
  dataSource = new MatTableDataSource<SpecificationHead>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  public id: number;
  public cid: number;
  public scid: number;

  public selectedSpecificationHead: SpecificationHead;
  public parentCatagoryAvailable: boolean


  constructor(
    private specHeadService: SpecificaitonHeadService,
    private subCatService: SubcatagoryService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router

  ) { }



  ngOnInit(): void {
this.selectedSpecificationHead=null
    this.getSourcedata();

  }
  async getSourcedata() {

    this.route.queryParams.subscribe(
      param => {
        this.cid = param.cid
        this.scid = param.scid
      })

    const t = await this.specHeadService.getallSpecificationHead(this.scid).toPromise();

    if (t) {
      this.dataSource.data = t
    } else {
      this.snackbar.open("Retrieve Data Fail", "error")
    }



  }



  saveSubCatagory(result: SpecificationHead) {
    if (result != undefined)
      this.specHeadService.saveSpecificationHead(this.id, result).subscribe(
        data => {
          this.snackbar.open(" Specif Saved Successfully !", "Message")._dismissAfter(2000)
          this.getSourcedata()
        },
        error => {
          this.snackbar.open("SubCatagory save failed !!", "error")._dismissAfter(2000)

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

   

  deleteSpecification(event, id) {
    var temp=this.dataSource.data.find(x=>x.id==id)
   this.deleteDialog(temp);
    
  }

  async editSpecification(event, id) {

    this.router.navigate(['admin/specificationform'], { queryParams: { sid: id }, queryParamsHandling: 'merge' })

  }
  deleteSpecificationHead(result: SpecificationHead) {
    if (result != undefined)
      this.specHeadService.deleteSpecificationHead(result.id).subscribe(
        data => {
          this.snackbar.open(" Specification Deleted Successfully !!!", "Message")._dismissAfter(2000)
          this.getSourcedata()
        },
        error => {
          this.snackbar.open(" Specification Delete failed !!", "error")._dismissAfter(2000)

        }
      );
  }




  deleteDialog(subCat: SpecificationHead): void {
    const dialogRef = this.dialog.open(SpecificationheadYesNoDialogComponent, {
      width: '300px',
      data: subCat
    });

    dialogRef.afterClosed().subscribe(result => {

      this.deleteSpecificationHead(result)

    }


    );
  }
  openSnackBar(message, type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
  goBack(){
    this.router.navigate(['admin/subcatagory'],{queryParams:{cid:this.cid}})
  
  }
}
