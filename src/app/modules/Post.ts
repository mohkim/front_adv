


export class Post {

    constructor(
        public id: number,       // post id
        public description: String,   // product short name
        public productSubCatagory: any,    // product sub catagory
        public  specificationList: any,  // tabular specification of product
        public  detail :String , // detail of product
        public postImage: any,      // images of product if there 
        public user:any,              //seller id       
        public post_payment: any 
    ) { }

    

 
}