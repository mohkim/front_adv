import { Component, OnInit } from "@angular/core";

export class Role  {

constructor( 
             public id:number,
             public name :"ROLE_USER"|"ROLE_MANAGER"|"ROLE_FINANCE"|"ROLE_ADMIN"
             ){

              
}
   
}