import { DatePipe } from '@progress/kendo-angular-intl';
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

export class IProductSoldCounts {
  today: ISellItems[] = [];
  popular: ISellItems[] = [];
  total: number = 0;
  most: Most[] = [];
}

export type Most = {
  name: string;
  count: number;
};

export class Productmodel {
  counts: IProductSoldCounts;

  constructor(
    items: ISellItems[],
    datePipe: DatePipe,
    service: ProductsService
  ) {
    this.counts = new IProductSoldCounts();
    items.forEach((item: ISellItems) => {
      if (
        datePipe.transform(item.date, 'dd-M-yyyy') ===
        datePipe.transform(new Date(), 'dd-M-yyyy')
      ) {
        this.counts.today.push(item);
      }
      for (let key in service.countName) {
        if (Number(service.countName[key]) >= 5) {
          if (item.name === key) {
            this.counts.popular.push(item);
          }
          service.countName[key] = service.countName[key]++;
          this.counts.most.push({
            name: key,
            count: +service.countName[key],
          });
        }
      }
    });
    this.counts.total = this.counts.today.length + this.counts.popular.length;
  }
}

export class TotalCalulationModel {
  sum!: number;
  constructor(val: numberGroup) {
    if (!(val.price && val.quantity)) return;
    this.sum = val.price * val.quantity;
  }
}

export class InvoiceNumber {
  invoice: number;
  constructor() {
    this.invoice = Math.floor(Math.random() * (99999 - 10000 + 10000));
  }
}
