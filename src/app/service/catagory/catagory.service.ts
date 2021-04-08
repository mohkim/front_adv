import { Injectable } from '@angular/core';
 
 
 
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
 
import { ProductCatagory } from 'src/app/modules/ProductCatagory';
import { CatagoryByQuantity} from 'src/app/modules/CatagoryByQuantity';
import { GlobalConstants } from 'src/app/utility/global-constants';
const AUTH_API = GlobalConstants.serverUrl+'adv/admin/';

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

  getListOfCatagoryByPost(){ 
    return  this.http.get<CatagoryByQuantity>(AUTH_API + 'catagorybynumber', httpOptions)
     }
 
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

  saveCatagoryImage(file: File,cid:number) {
 
 
 
    const formData: FormData = new FormData();
      
       formData.append('file', file);
 
     
     const req = new HttpRequest('POST',`${AUTH_API}catagory/${cid}/image`, formData, {
       reportProgress: true,
       responseType: 'json'
     });
 
     return this.http.request(req);
      
   }
 
  
}
