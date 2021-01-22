import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 
import { FormGroup } from '@angular/forms';
 
import { Role } from 'src/app/modules/Role';
import { RoleService } from 'src/app/service/user/role.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {
  public catForm: FormGroup;
  
 constructor( 
  public dialogRef: MatDialogRef<RoleFormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Role,
  public  roleService:RoleService) {}


    roles

  ngOnInit(): void {
    this.roles=this.roleService.getallRole().subscribe(
      result =>{
        this.roles=result;
        console.log("roles ==>"+JSON.stringify(this.roles))
      }, error=> {

      }
    );
  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
