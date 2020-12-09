 
import { Role } from './Role';

export class User  {

constructor(  
            
             public email :String,
             public password :String,
             
             public  fullName :String,
             public  id:number,
             
             public salesLocation?:any, 
             public active?:boolean,
             public disabledbyAdmin?:boolean,
             public description?:String,
             public  roles?:Role[],
             public  username?:String
             ){ }
                  
  // ngOnInit(): void {
  //     this.email=""
  //     this.password=""
  //     this.username=""       
  //     this.id=-1        
          
  // }
}