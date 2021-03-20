import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/modules/User';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user/user.service';
import { UserFormComponent } from './userForm/user-form/user-form.component';
import { UserYesNoDialogComponent } from './userYesNoDialog/user-yes-no-dialog/user-yes-no-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayedColumns = [
    'Id',
    'Name',
    'Email',
    'Disable',
    'Detail',
    'Delete',
    'To post',
  ];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedUser = new User('', '', '', -1,null);

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.selectedUser =new User('', '', '', -1,null);
    this.updateSource();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  updateSource() {
    this.userService.getallUser().subscribe(
         data =>  this.dataSource.data=data,
          error => this.dataSource=null
 );  }
 
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 async deleteCatagory(event, id) {
  const  p:User=await this.userService.getUserById(id).toPromise();   
        if(p!= undefined) this.deleteDialog(p);
    }
  async detail(event, id) {
    const  p:User=await this.userService.getUserById(id).toPromise(); 
    
    if(p!= undefined)  this.openDialog(p);
  }

  openDialog(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '80%',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      
      if (result != undefined) {
        
      this.userSave(result);
    
      }
    });
  }

  deleteDialog(usr: User): void {
    const dialogRef = this.dialog.open(UserYesNoDialogComponent, {
      width: '300px',
      data: usr,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined)  this.userDelete(result.id);
       });
  }

  openSnackBar(message, type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }

  userSave( usr:User){
  
    this.userService.saveUser(usr).subscribe(
      result =>  {  this.openSnackBar('User changes Updated Successfully', 'Message');      
                     this.updateSource();
                  },
      error  => {    
                    this.openSnackBar('User changes Update faill ', 'Error');  
                    this.updateSource();
                }
    );
  }
  userDelete(id:number){
     this.userService.deleteUser(id).subscribe(
      result => {  
          this.openSnackBar('User deleted Successfully', 'Message'); 
          this.updateSource();  
                },
      error  => {   
           this.openSnackBar('User delete  faill ', 'Error');
            this.updateSource(); 
                }
     );

  }
}
