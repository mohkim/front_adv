import { Injectable } from '@angular/core';
 
 
 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCatagory } from 'src/app/modules/ProductCatagory';
const AUTH_API = 'http://localhost:8080/adv/admin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root',
})
export class CatagoyrService {
  
 
  constructor(
    private http: HttpClient
  ) {}


 
  deleteProductCatagory(cat:ProductCatagory){ 
    return  this.http.delete(AUTH_API + 'catagory/'+cat.id, httpOptions)
     }

    saveProductCatagory(cat:ProductCatagory){
      return  this.http.post<ProductCatagory>(AUTH_API + 'catagory' ,cat, httpOptions)
      
    }

  getallProductCatagory(){ 
    // console.log(JSON.stringify(this.catagorys))
   return  this.http.get<ProductCatagory[]>(AUTH_API + 'catagory' , httpOptions)
    }
    getallProductCatagorybyObjectType(){ 
      // console.log(JSON.stringify(this.catagorys))
     return  this.http.get(AUTH_API + 'catagory' , httpOptions)
      }
  getProductCatagoryById(selectedid:number){  
    return  this.http.get<ProductCatagory>(AUTH_API + 'catagory/'+selectedid , httpOptions)
   
  }
 
  
}
