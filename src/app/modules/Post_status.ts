import { User } from "./User";

export class Post_status {
  constructor(
    public id: number,
    public status: "PENDING"|"ACTIVE"|"ERROR"|"EXPIRED"|"SOLD"|"DISABLED",
    public apply_date?:Date ,
    public rejectedByUser?: User,
    public rejectionReason?:String,
    public rejected_date?: Date,
    public approvedByUser?: User,
    public approved_date?: Date,
    public diasabledByUser?: User,
    public disabled_date?: Date
  ) {}
}
