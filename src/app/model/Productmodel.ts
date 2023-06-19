import { DatePipe } from '@angular/common';
import { ProductsService } from 'src/app/service/products.service';

export interface IAddItems {
  id: string;
  name: string;
  description: string;
  numberGroup: numberGroup;
  total: number;
}

export interface ISellItems {
  address: string;
  customerName: string;
  id: string;
  invoice: string;
  name: string;
  numberGroup: numberGroup;
  remark: string;
  total: number;
  date: string;
}

export type numberGroup = {
  price: number;
  quantity: number;
};

export class ProductSoldCounts {
  today: ISellItems[] = [];
  popular: ISellItems[] = [];
  total: number = 0;
  most!: Most[] ;
}

export type Most = {
  name: string;
  count: number;
};

export class Productmodel {
  public counts:ProductSoldCounts = new ProductSoldCounts();

  constructor(
    items: ISellItems[],
    datePipe: DatePipe,
  ) {

    items.forEach((item: ISellItems) => {
      if (
        datePipe.transform(item.date, 'dd-M-yyyy') ===
        datePipe.transform(new Date(), 'dd-M-yyyy')
      ) {
        this.counts.today.push(item);
      }
      if(this.counts.most){

      }
        if (this.counts.today.length >= 5) {
            this.counts.popular.push(item);
        }
    });
    this.counts.total = this.counts.today.length + this.counts.popular.length;
  }
}

export class TotalCalulationModel {
  public sum!: number;
  constructor(val: numberGroup) {
    if (!(val.price && val.quantity)) return;
    this.sum = val.price * val.quantity;
  }
}

export class InvoiceNumber {
  public invoice: number;
  constructor() {
    this.invoice = Math.floor(Math.random() * (99999 - 10000 + 10000));
  }
}
