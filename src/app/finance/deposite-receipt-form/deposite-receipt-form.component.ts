import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DepositReciept } from 'src/app/modules/DepositReciept';
import { User } from 'src/app/modules/User';
import { DepositeReceiptServiceService } from 'src/app/service/depositeSerivce/deposite-receipt-service.service';
import { TokenStorageService } from 'src/app/service/tokenStorage/token-storage.service';
import { UserService } from 'src/app/service/user/user.service';
import { GlobalConstants } from 'src/app/utility/global-constants';

const AUTH_API = GlobalConstants.serverUrl+'adv/'; 
@Component({
  selector: 'app-deposite-receipt-form',
  templateUrl: './deposite-receipt-form.component.html',
  styleUrls: ['./deposite-receipt-form.component.css']
})
export class DepositeReceiptFormComponent implements OnInit {

  email = ""
  description=""
  amount:number
  errormessage = ""
  user: User
  submitted = false
  userFound = false
  casherName=""
  

  constructor(private userService: UserService,
    private dReceiptService: DepositeReceiptServiceService,
    private  tockenStorage:TokenStorageService,
    private  route:ActivatedRoute,
    private  router:Router,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  async findUserSubmit() {
    // console.log("Email submitted ==> " + this.email)
    const u = await this.userService.getUserByEmail(this.email).toPromise()

    if (u) {
      this.userFound = true;
      this.user = u
      this.casherName=this.tockenStorage.getUserName()
      
    } else {
      this.userFound = false
      this.openSnackBar("User Not Found !!!!", "Error")
    }

  }
  clearbutton(){
    this.userFound=false
    this.email=""
    this.description=""
    this.amount=0
  }
  getImage(){
   
    if(this.user.image_name === null) return  "assets/img/default_user.png"
  else  return  AUTH_API+"img/"+this.user.image_name;
  }
  DepositSubmit(){
 if(this.tockenStorage.getUserId() === this.user.id){
   this.openSnackBar("You Cannot deposite For your self ","Error")
   return
 }
 var  depositeReceipt=new DepositReciept(null,this.description,this.amount)
  this.dReceiptService.saveDepositeReceipt(this.user.id,depositeReceipt).subscribe(
    result=>{
      this.openSnackBar("data saved Successfully !!!","Message")
      this.router.navigate(['/finance'])
    },
    error=> {

    }
  )
  }
  openSnackBar(message, head) {
    this.snackbar.open(message, head, {
      duration: 3000,
    });
  }


}
