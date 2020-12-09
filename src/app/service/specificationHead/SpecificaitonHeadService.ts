import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpecificationHead } from 'src/app/modules/SpecificationHead';
 
const AUTH_API = 'http://localhost:8080/adv/admin';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SpecificaitonHeadService {

  constructor(
    private http: HttpClient
  ) {}
 
  deleteSpecificationHead(id:number){ 
    return  this.http.delete(`${AUTH_API}/specification_head/${id}`, httpOptions)
     }

    saveSpecificationHead(sCid:number,spHead:SpecificationHead){
       return  this.http.post<SpecificationHead>( `${AUTH_API}/subcatagory/${sCid}/specification_head` ,spHead, httpOptions)
      
    }

  getallSpecificationHead(scid :number){  
    
   return  this.http.get<SpecificationHead[]>(`${AUTH_API}/subcatagory/${scid}/specification_head` , httpOptions)
   
   
  }
  getSpecificationHeadById(id:number){   
    return  this.http.get<SpecificationHead>(`${AUTH_API}/specification_head/${id}` , httpOptions)
   
  }
 
  
}
