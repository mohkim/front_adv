import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductSubCatagory } from 'src/app/modules/ProductSubCatagory';
import { ProductCatagory } from 'src/app/modules/ProductCatagory';
const AUTH_API = 'http://localhost:8080/adv/admin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubcatagoryService {
 
  constructor(
    private http: HttpClient
  ) {}
 
  getSubcatagoryList(id:number){ 
    return  this.http.get<ProductSubCatagory[]>(`${AUTH_API}subcatagorylist/${id}`, httpOptions)
     }

    saveProductSubCatagory(cat:number,subcat:ProductSubCatagory){
      console.log("sub catagory -> "+JSON.stringify(subcat))
      return  this.http.post<ProductSubCatagory>(`${AUTH_API}catagory/${cat}/subcatagory` ,subcat, httpOptions)
      
    }
    deleteSubCatagory(id :number){ 
    
   return  this.http.delete(`${AUTH_API}subcatagory/${id}`, httpOptions)
   
   
  }
  getProductSubCatagoryById(subcat:number){  
    return  this.http.get<ProductSubCatagory>(`${AUTH_API}subcatagory/${subcat}` , httpOptions)
   
  }
 
  
}
