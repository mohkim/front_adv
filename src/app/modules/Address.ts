import { User } from './User';

 
export class Address  {

constructor(  
             public id:number,
             public address:String,
             public  city:String,
             public  state:String,
            
             public  user?:User
             ){        
}
 
 
  
}