import { SalesLocation } from './SalesLocation';

export class ProductSubCatagory {
    constructor(
        public id: number,
        public name: String,
         public  type:"PRODUCT"|"SERVICE"|"JOB",
         public contact: Boolean, //payment method
        public price: Boolean,     //payment method
        public commision: Boolean,  //payment method
        public range: Boolean,  //payment method
        public fee_week_enable: Boolean,      //payment method
        public fee_week:number,
        public fee_free_enable: Boolean,      //payment method
        public fee_free:number, 
        public fee_month_enable: Boolean, 
        public  fee_month: number, 
        public fee_year_enable: Boolean, 
        public fee_year: number,
        public  img_min:number,
        public  img_max:number,
        public  salesLocation?:SalesLocation, 
        public specificationList?:any
        
      ) {   
            }
}
         