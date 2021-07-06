import { User } from "./User";

export class UserDepositRecept {
  constructor(
    public id: number,
    public user: User,
    public description: String,
    public receiptNo: String,
    public amount: number,
  ) { }
}
