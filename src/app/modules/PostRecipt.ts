export class PostRecipt {
  constructor(
    public id: number,
    public   description:String,
    public feeOption: 'FREE'|'WEEK' | 'MONTH' | 'YEAR' ,
    public receiptNo: String,
    public amount: number,
  ) {}
}
