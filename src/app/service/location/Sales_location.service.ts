import { Injectable } from '@angular/core';

 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesLocation }  from '../../modules/SalesLocation';
import { GlobalConstants } from 'src/app/utility/global-constants';
const AUTH_API = GlobalConstants.serverUrl+'adv/admin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class LocationService {

 
  constructor(
    private http: HttpClient
  ) {}


 
  deleteSalesLocation(id:number){ 
    return  this.http.delete(AUTH_API + 'saleslocation/'+id, httpOptions)
     }

    saveSalesLocation (loc:SalesLocation){
      return  this.http.post<SalesLocation >(AUTH_API + 'saleslocation' ,loc, httpOptions)
      
    }

  getallSalesLocation (){ 
    // console.log(JSON.stringify(this.catagorys))
   return  this.http.get<SalesLocation []>(AUTH_API + 'saleslocation' , httpOptions)
    }
 
  getSalesLocationById(selectedid:number){  
    return  this.http.get<SalesLocation >(AUTH_API + 'saleslocation/'+selectedid , httpOptions)
   
  }
 
  
}
