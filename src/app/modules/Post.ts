import { PostPayment } from "./PostPayment";
import { PostSpecification } from "./PostSpecification";



export class Post {

    constructor(
        public id: number,       // post id
        public description: String,   // product short name
        public productSubCatagory: any,    // product sub catagory
        public  salesLocation:any,
        public  specificationList: PostSpecification[],  // tabular specification of product
        public  detail :String , // detail of product
        public postImage: any,      // images of product if there 
        public user:any,              //seller id       
        public post_payment: PostPayment,
        public  post_status:"PENDING"|"ACTIVE"|"ERROR"|"EXPIRED",
        public  createdDate?:Date,
        public  updatedDate?:Date,
        public  view?:number 
    ) { }

  }