import { PostPayment } from "./PostPayment";
import { PostRecipt } from "./PostRecipt";
import { PostSpecification } from "./PostSpecification";
import { Post_status } from "./Post_status";


 
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
        
        public  view:number ,
        public post_receipt?:PostRecipt,
        public  post_status?:Post_status,
        
        
    ) { }

  }