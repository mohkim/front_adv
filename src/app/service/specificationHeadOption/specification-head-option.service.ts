 

  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { SpecificationHeadOption } from 'src/app/modules/SpecificationHeadOption';
import { GlobalConstants } from 'src/app/utility/global-constants';
   
  const AUTH_API = GlobalConstants.serverUrl+'adv/admin/';
  
  const httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  export class SpecificationHeadOptionervice {
  
    constructor(
      private http: HttpClient
    ) {}
   
    deleteSpecificationheadOption(id:number){ 
      return  this.http.delete(`${AUTH_API}head_option/${id}`, httpOption)
       }
  
      saveSpecificationheadOption(id:number,spheadOption:SpecificationHeadOption){
         return  this.http.post<SpecificationHeadOption>( `${AUTH_API}specification_head/${id}/head_option` ,spheadOption, httpOption)
        
      }
  
    getallSpecificationheadOption(id :number){  
      
     return  this.http.get<SpecificationHeadOption[]>(`${AUTH_API}head_optionlist/${id}` , httpOption)
     
     
    }
    getSpecificationheadOptionById(id:number){   
      return  this.http.get<SpecificationHeadOption>(`${AUTH_API}head_option/${id}` , httpOption)
     
    }
   
    
  }