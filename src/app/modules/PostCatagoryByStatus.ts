 

 
export class PostCatagoryByStatus  {

constructor(  
              public status: "PENDING"|"ACTIVE"|"ERROR"|"EXPIRED"|"SOLD"|"DISABLED",
              public  qty:number
             
             ){       
           }
 
}
 