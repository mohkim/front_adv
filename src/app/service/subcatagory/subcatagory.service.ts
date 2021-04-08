import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductSubCatagory } from 'src/app/modules/ProductSubCatagory';
 
import { GlobalConstants } from 'src/app/utility/global-constants';
import { SubCatagoryByQuantity } from 'src/app/modules/SubCatagoryByQuantity';

const AUTH_API = GlobalConstants.serverUrl+'adv/admin/';

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
 
  getListOfCatagoryByPost(id:number){ 
    return  this.http.get<SubCatagoryByQuantity>(`${AUTH_API}cat/${id}/subcatagorybynumber`, httpOptions)
     }
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
