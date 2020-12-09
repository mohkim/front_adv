 export class PostPayment {

    constructor(
        public id: number,        
        public contact: boolean,    
        public negotiable: boolean,     
        public commision: boolean,
        public range: boolean, 
        public  price_amount:number, 
        public  min: number,       
        public  max: number   
          ) { } 
}