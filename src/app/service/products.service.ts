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

   updateStorage() {
      localStorage.setItem('products', JSON.stringify(this.items));
   }

   getAllProducts() {
      if (localStorage.getItem('products')) {
         this.temp = localStorage.getItem('products');
         this.items = JSON.parse(this.temp);
      }
      return of(this.items).pipe(delay(1000));
   }

   getAllProductName() {
      if (localStorage.getItem('products')) {
         this.temp = localStorage.getItem('products');
         this.temp = JSON.parse(this.temp);
         this.temp = Array.from(this.temp).map((val: any) => {
            return val.name;
         })
      }
      return of(this.temp).pipe(delay(1000));
   }


   addItems(data: IAddItems) {
      this.items.push(data);
      localStorage.setItem('products', JSON.stringify(this.items));
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

   sellItem(data: ISellItems) {
      console.log('here is sell Item', data);
      this.soldItems.push(data);
      this.decQuantity(data);
      localStorage.setItem('soldItems', JSON.stringify(this.soldItems));
   }


   getAllSoldProducts() {
      if (localStorage.getItem('soldItems')) {
         this.temp = localStorage.getItem('soldItems');
         this.soldItems = JSON.parse(this.temp);
      }
      return of(this.soldItems).pipe(delay(1000));
   }

   decQuantity(val: ISellItems) {
      this.items.forEach((x: any, i) => {
         if (val.name === x.id && x.quantity >= val.quantity) {
            x.quantity = x.quantity - val.quantity;
            this.items[i] = x;
            return true;
         } else {
            return false;
         }
      })
      this.updateStorage();
   }
}
