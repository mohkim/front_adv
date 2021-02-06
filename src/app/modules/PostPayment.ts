import { Currency } from "./Currency";

export class PostPayment {
  constructor(
    public id: number,
    public option: 'CONTACT' | 'PRICE' | 'COMMISSION' | 'RANGE',
    public negotiable: boolean,
    public price_amount: number,
    public price_currency:Currency,
    public min: number,
    public max: number,
    public range_currency:Currency,
  ) {}
}
