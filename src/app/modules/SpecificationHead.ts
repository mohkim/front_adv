export class SpecificationHead {
    constructor(
        public id: number,
        public value: String,
        public key: String,
        public label: String,
        public required:boolean,
        public controlType:  "textbox"|"dropdown"|"textarea",
        public  type: ""|"text"|"email",
        public pattern: String,
        public  placeholder : string,
        public order?: number,
        public  options?:any
      ) {   
            }
}
 