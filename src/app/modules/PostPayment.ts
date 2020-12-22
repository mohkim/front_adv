export class PostPayment {
  constructor(
    public id: number,
    public option: 'CONTACT' | 'PRICE' | 'COMMISSION' | 'RANGE',
    public negotiable: boolean,
    public price_amount: number,
    public min: number,
    public max: number
  ) {}
}
