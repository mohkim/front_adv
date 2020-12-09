import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Currency }  from '../../modules/Currency';

const AUTH_API = 'http://localhost:8080/adv/admin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

 
  constructor(
    private http: HttpClient
  ) {}


 
  deleteCurrency(id:number){ 
    return  this.http.delete(AUTH_API + 'currency/'+id, httpOptions)
     }

    saveCurrency (loc:Currency){
      return  this.http.post<Currency >(AUTH_API + 'currency' ,loc, httpOptions)
      
    }

  getallCurrency (){ 
    // console.log(JSON.stringify(this.catagorys))
   return  this.http.get<Currency []>(AUTH_API + 'currency' , httpOptions)
    }
 
  getCurrencyById(selectedid:number){  
    return  this.http.get<Currency>(AUTH_API + 'currency/'+selectedid , httpOptions)
   
  }
 
  
}
