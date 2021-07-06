import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesLocation } from '../../modules/SalesLocation';
import { GlobalConstants } from 'src/app/utility/global-constants';
import { DepositReciept } from 'src/app/modules/DepositReciept';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
const AUTH_API = GlobalConstants.serverUrl + 'adv/fin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class DepositeReceiptServiceService {


  constructor(
    private http: HttpClient,
    private tokenStorage:TokenStorageService,
    public snackBar: MatSnackBar
  ) { }

  getAllDepositeReceipt() {
    return this.http.get(`${AUTH_API}finance/receipt`, httpOptions)
  }
  getDepositeReceiptById(id: number) {
    return this.http.get(`${AUTH_API}finance/receipt/${id}`, httpOptions)
  }

  getAllDepositeReceiptUser(user_id: number) {
    return this.http.get(`${AUTH_API}finance/receipt/user/${user_id}`, httpOptions)
  }
 
  getAllDepositeReceiptByCasher() {
    var casher_id=<number>this.getcurrentUser();
 
    return this.http.get<DepositReciept[]>(`${AUTH_API}finance/receipt/casher/${casher_id}`, httpOptions)
  }
  saveDepositeReceipt(user_id:number,deReciept:DepositReciept) {
    var casher_id=this.getcurrentUser();
     if(user_id===casher_id){
  
     }else {
      return this.http.post(`${AUTH_API}finance/receipt/user/${user_id}/casher/${casher_id}`,deReciept, httpOptions)

     }
   
  }

 getcurrentUser(){
   return this.tokenStorage.getUserId()
 }
 

 
openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 3000,
  });
}
}
