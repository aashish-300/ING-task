import { Injectable } from '@angular/core';
import { Observable, delay, from, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAddItems, ISellItems } from '../model/Productmodel';


@Injectable({
   providedIn: 'root'
})
export class ProductsService {

   private apiUrl = 'http://localhost:5000/products';
   // private apiUrl = 'https://misty-ox-sweater.cyclic.app/products';

   constructor(private http: HttpClient) {
   }

   temp: any;
   items: IAddItems[] = [];
   edit: boolean = false;
   soldItems: ISellItems[] = [];
   StartTime = 2500;
   EndTime = 5000;

   delayNumber(): number {
      return Math.random() * ((this.EndTime - this.StartTime) + this.StartTime);
   }

   updateStorage() {
      localStorage.setItem('products', JSON.stringify(this.items));
   }

   getAllProducts(): Observable<IAddItems[]> {
      if (localStorage.getItem('products')) {
         this.temp = localStorage.getItem('products');
         this.items = JSON.parse(this.temp);
      }
      return ob<IAddItems[]>(this.items);
   }

   getAllProductName(): Observable<string[]> {
      if (localStorage.getItem('products')) {
         this.temp = localStorage.getItem('products');
         this.temp = JSON.parse(this.temp);
         this.temp = Array.from(this.temp).map((val: any) => {
            return val.name;
         })
      }
      return ob<string[]>(this.temp);
   }


   addItems(data: IAddItems): Observable<IAddItems[]> {
      console.log("addItems", data);
      this.items.push(data);
      localStorage.setItem('products', JSON.stringify(this.items));
      return ob<IAddItems[]>(this.items);
   }

   deleteItem(item: IAddItems) {
      this.temp = Array.from(this.items).filter((e: any) => {
         return e.id !== item.id
      })
      this.items = this.temp;
      this.updateStorage();
   }

   editItem(data: IAddItems) {
      this.temp = data;
      console.log('inside edit item',this.temp);
      this.edit = true;
   }

   updateItem(data: IAddItems) {
      this.items.forEach((val: IAddItems, i) => {
         if (val.id === data.id) {
            this.items[i] = data;
            this.updateStorage()
         }
      })
   }

   sellItem(data: ISellItems): Observable<ISellItems[]> {
      this.soldItems.push(data);
      this.decQuantity(data);
      localStorage.setItem('soldItems', JSON.stringify(this.soldItems));
      return ob<ISellItems[]>(this.soldItems)
   }


   getAllSoldProducts(): Observable<ISellItems[]> {
      if (localStorage.getItem('soldItems')) {
         this.temp = localStorage.getItem('soldItems');
         this.soldItems = JSON.parse(this.temp);
      }
      return ob<ISellItems[]>(this.soldItems);
   }

   decQuantity(val: ISellItems) {
      this.items.forEach((x: any, i) => {
         if (val.name === x.id && x.quantity >= val.numberGroup.quantity) {
            x.quantity = x.quantity - val.numberGroup.quantity;
            this.items[i] = x;
            return true;
         } else {
            return false;
         }
      })
      this.updateStorage();
   }
}


export function ob<T = any>(ob: T) {
   return of(ob).pipe(delay(delayNumber()))
}

export function delayNumber(): number {
   const startTime = 2500;
   const endTime = 5000;
   return Math.random() * ((endTime - startTime) + startTime);
}