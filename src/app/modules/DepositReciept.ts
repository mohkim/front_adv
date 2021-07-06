import { User } from "./User";

export class DepositReciept {
  constructor(
    public id: number,
    public description: String,
    public amount: number,
    public   receipt_void?:boolean,
    public  createdDate?:Date,
    public  updatedDate?:Date,
    public  void_date?:Date,
    public  user?:User,
    public  user_void?:User,
  
  ) {}
}
