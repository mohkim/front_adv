import { ProductSubCatagory } from './ProductSubCatagory';


export class ProductCatagory {

    constructor(
        public id: number,
        public name:string,
        public icon :string,
        public img:String,
        public  productSubCatagory?:ProductSubCatagory[]
      ) {   
            }
}
