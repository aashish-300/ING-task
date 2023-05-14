import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:5000/products';

  constructor(private http: HttpClient) {
   }

   temp:any;
   items:any;

   getAllProducts(){
    return this.http.get(this.apiUrl);
   }

   getProduct(id:any){
      return this.http.get(this.apiUrl+'/'+id);
   }

   addItems(data:any){
    return this.http.post(this.apiUrl,data);
   }

   deleteItem(id:any){
    return this.http.delete(this.apiUrl+'/'+id);
   }

   editItem(id:any, data:any){
      return this.http.put(this.apiUrl+'/'+id,data);
   }

   sellItem(data:any){
    console.log(data);
    return this.http.post("http://localhost:5000/sold",data);
   }

   getAllProductsName(){
    this.http.get(this.apiUrl).subscribe(data => {
       this.items = data;
    });
   }

   getAllSoldProducts(){
      return  this.http.get("http://localhost:5000/sold");
   }

}
