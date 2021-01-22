import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
 
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
 
import { MatDialog } from '@angular/material/dialog';
 
 
 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from 'src/app/modules/Role';
import { RoleService } from 'src/app/service/user/role.service';
import { RoleYesNoDialogComponent } from './role-yes-no-dialog/role-yes-no-dialog.component';
import { RoleFormComponent } from './role-form/role-form.component';
 
 

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  displayedColumns = ['id', 'name', 'Delete'];
  dataSource = new MatTableDataSource<Role>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() userId;
 

  constructor(
    private roleService: RoleService,
    public dialog: MatDialog,
    private snackbar:MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getSourcedata();
  }
  getSourcedata(){
  
    this.roleService.getAllUserRole(this.userId).subscribe(
      result=> {
        
        this.dataSource.data =result
        console.log("user   roles ==>"+JSON.stringify(result))
      },
      error=>{
        this.snackbar.open("Retrieve Data Fail","error")._dismissAfter(2000)
      }
    );
    
  }
 
  saveRole(result:Role){
    
    this.roleService.addUserRole(this.userId,result.id).subscribe(
      data=> { 
          this.snackbar.open("Role Saved Successfully !","Message")._dismissAfter(2000)
          this.getSourcedata()
      },
      error=>{   this.snackbar.open(error.error.message,"error")._dismissAfter(2000)
         
      }
    );
     
  }
   
  deleteOldRole(result:Role){
    console.log("role deleted =>"+result.id+"  user =? "+this.userId)
    this.roleService.deleteUserRole(this.userId,result.id).subscribe(
      data=> { 
          this.snackbar.open("Role Deleted Successfully !!!","Message")._dismissAfter(2000)
          this.getSourcedata()
      },
      error=>{  
         console.log( JSON.stringify(error))
         this.snackbar.open( error.error.message,"error")._dismissAfter(2000)
         
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  newRole(){
   
    var catagory=new  Role(-1,'ROLE_USER')
    this.openDialog(catagory);
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRole(event, id){
  var temp=this.dataSource.data.find(x=>x.id===id)  
  this.deleteDialog(temp);
    
   
  }
  editCat(event, id) {
    var temp=this.dataSource.data.find(x=>x.id===id)  
    this.openDialog(temp);
     
  }

  openDialog( catagory:Role): void {
    
    const dialogRef = this.dialog.open(RoleFormComponent, {
      width: '25%',
      data: catagory,
    });

    dialogRef.afterClosed().subscribe((result) => {
     
      
      if(result != undefined){
       
            this.saveRole(result);
             
      }
    });
  }
  

  deleteDialog(cat:Role): void {
    const dialogRef = this.dialog.open(RoleYesNoDialogComponent, {
      width: '300px',
      data: cat
    });

    dialogRef.afterClosed().subscribe(result => {
        
       this.deleteOldRole(result)
       
    });
  }
  openSnackBar( message,type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
}
