import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
   providedIn: 'root'
})
export class ProductsService {

   private apiUrl = 'http://localhost:5000/products';

   constructor(private http: HttpClient) {
   }

   temp: any;
   items: any;

   getAllProducts() {
      return this.http.get(this.apiUrl);
   }

   getProduct(id: any) {
      console.log(id);
      return this.http.get(this.apiUrl + '/' + id);
   }

   addItems(data: any) {
      return this.http.post(this.apiUrl, data);
   }

   deleteItem(id: any) {
      return this.http.delete(this.apiUrl + '/' + id);
   }

   editItem(id: any, data: any) {
      return this.http.put(this.apiUrl + '/' + id, data);
   }

   sellItem(data: any) {
      console.log(data);
      this.decItem(data.name, data.quantity);
      console.log('item sold successfully')
      return this.http.post("http://localhost:5000/sold", data);
   }

   getAllProductsName() {
      this.http.get(this.apiUrl).subscribe(data => {
         this.items = data;
      });
   }

   getAllSoldProducts() {
      console.log('all products');
      return this.http.get("http://localhost:5000/sold");
   }

   decItem(id: any, quantity: any) {
      let item: any;
      return this.http.get(this.apiUrl + '/' + id).subscribe(data => {
         item = data;
         item.quantity -= quantity;
         console.log(item);
         const update = { quantity: item.quantity };
         console.log(update);
         const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
         this.http.put(this.apiUrl + '/' + id, update, { headers });
      })
      
   }

}
