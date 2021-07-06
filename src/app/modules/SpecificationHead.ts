export class SpecificationHead {
    constructor(
        public id: number,
        public key: String,
        public label: String,
        public required:boolean,
        public controlType:  "textbox"|"dropdown"|"textarea",
        public  type: ""|"text"|"email",
        public selectType: "PARENT"|"CHILD"|"NONE",
        public  parentkey:String,
        public pattern: String,
        public  placeholder : string,
        public value?: String,
        public parentvalue?:string,
        public order?: number,
        public  options?:any
      ) {   
            }
}
  