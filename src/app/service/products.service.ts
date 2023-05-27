import { Injectable, OnInit } from '@angular/core';
import { Observable, delay, from, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAddItems, ISellItems } from '../model/Productmodel';


@Injectable({
   providedIn: 'root'
})
export class ProductsService implements OnInit {

   private apiUrl = 'http://localhost:5000/products';
   // private apiUrl = 'https://misty-ox-sweater.cyclic.app/products';

   constructor(private http: HttpClient) { }

   temp: any;
   items: IAddItems[] = [];
   edit: boolean = false;
   soldItems: ISellItems[] = [];
   countName: {}[] = [{}]

   ngOnInit(): void {
    this.getAllSoldProducts().subscribe(
      {
         next: (item: ISellItems[]) => {},
         complete: () => this.productCount()
      });
      
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

   searchItem(val: string) {
      this.temp = this.items.filter(e => {
         return e.name === val;
      })
      return ob<IAddItems[]>(this.temp);
   }


   addItems(data: IAddItems): Observable<IAddItems[]> {
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

   productCount():{} {
      const productName = this.soldItems.map(item => {
         return item.name;
      })
      this.countName = this.countElements(productName);
      return this.countName;
   }

   countElements(arr:any) {
   let counts:any = {};
 
   for (let i = 0; i < arr.length; i++) {
     let element = arr[i];
     if (counts[element]) {
       counts[element]++;
     } else {
       counts[element] = 1;
     }
   }
 
   return counts;
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
         if (val.name === x.id && x.numberGroup.quantity >= val.numberGroup.quantity) {
            x.numberGroup.quantity -= val.numberGroup.quantity;
            this.items[i] = x;
            return true;
         } else {
            return false;
         }
      })
      this.updateStorage();
   }
}

// export function checkItem(data: ISellItems) {
//    console.log(this.items)
// }


export function ob<T = any>(ob: T) {
   return of(ob).pipe(delay(delayNumber()))
}

export function delayNumber(): number {
   // const startTime = 500;
   // const endTime = 2500;
   const startTime = 100;
   const endTime = 500;
   return Math.random() * ((endTime - startTime) + startTime);
}


// function countElements(arr) {
//    var counts = {};
 
//    for (var i = 0; i < arr.length; i++) {
//      var element = arr[i];
//      if (counts[element]) {
//        counts[element]++;
//      } else {
//        counts[element] = 1;
//      }
//    }
 
//    return counts;
//  }
 
//  // Example usage:
//  var array = ["apple", "banana", "apple", "orange", "banana", "apple"];
//  var elementCounts = countElements(array);
 
//  // Output the counts
//  for (var key in elementCounts) {
//    console.log('Element: ' + key + ', Count: ' + elementCounts[key]);
//  }
 