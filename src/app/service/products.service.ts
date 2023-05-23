import { Injectable } from '@angular/core';
import { Observable, delay, from, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAddItems } from '../model/Productmodel';


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
   soldItems: any = [];

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


   addItems(data: any) {
      this.items.push(data);
      localStorage.setItem('products', JSON.stringify(this.items));
   }

   deleteItem(item: any) {
      this.temp = Array.from(this.items).filter((e: any) => {
         return e.id !== item.id
      })
      this.items = this.temp;
      this.updateStorage();
   }

   editItem(data: any) {
      this.temp = data;
      this.edit = true;
   }

   updateItem(data: any) {
      Array.from(this.items).forEach((val: any, i) => {
         if (val.id === data.id) {
            this.items[i] = data;
            this.updateStorage()
         }
      })
   }

   sellItem(data: any) {
      console.log(data);
      this.soldItems.push(data);
      localStorage.setItem('soldItems', JSON.stringify(this.soldItems));
   }


   getAllSoldProducts() {
      if (localStorage.getItem('soldItems')) {
         this.temp = localStorage.getItem('soldItems');
         this.soldItems = JSON.parse(this.temp);
         console.log('soldItems: ', this.soldItems);
      }
      return of(this.soldItems).pipe(delay(1000));
   }

   decQuantity(val: any) {
      Array.from(this.items).forEach((x: any, i) => {
         if (val.name === x.id && Number(x.quantity) >= Number(val.quantity)) {
            x.quantity = Number(x.quantity) - Number(val.quantity);
            this.items[i] = x;
            return true;
         } else {
            return false;
         }
      })
      this.updateStorage();
   }
}
