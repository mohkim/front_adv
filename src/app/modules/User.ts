 
import { Contact } from './Contact';
import { Role } from './Role';

export class User  {

constructor(  
            
             public email :String,
             public password :String,
             
             public  fullName :String,
             public  id:number,
             public  contact:Contact,
             public salesLocation?:any, 
             public active?:boolean,
             public disabledbyAdmin?:boolean,
             public description?:String,
             public  roles?:Role[],
             public  username?:String,
             public  image_name?:String,
             public  image_url?:String
             ){ }
                  
 
 
}