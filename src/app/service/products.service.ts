import { Injectable, OnInit } from '@angular/core';
import { Observable, delay, from, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAddItems, ISellItems } from '../common/model/Productmodel';

/**
 * Service responsible for managing products and sold items.
 *
 * @remarks
 * This service provides methods to interact with product data, such as adding, deleting, editing, and selling items.
 * It also provides methods to retrieve and count products and sold items.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  /**
   * Constructs an instance of the ProductsService.
   *
   * @param http - The HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Temporary variable to store data.
   */
  temp: any;

  /**
   * Array of items representing added products.
   */
  items: IAddItems[] = [];

  /**
   * Flag indicating whether an item is being edited.
   */
  edit: boolean = false;

  /**
   * Array of items representing all products.
   */
  allItems: IAddItems[] = [];

  /**
   * Array of items representing sold products.
   */
  soldItems: ISellItems[] = [];

  /**
   * Array to store product count by name.
   */
  // countName: {}[] = [{}];
  countName: any;
  /**
   * Lifecycle hook that is called after construction and initialization of the service.
   */
  ngOnInit(): void {
    this.getAllSoldProducts().subscribe({
      next: (item: ISellItems[]) => {},
      complete: () => this.productCount(),
    });
  }

  /**
   * Updates the local storage with the current item list.
   */
  updateStorage(): void {
    localStorage.setItem('products', JSON.stringify(this.items));
  }

  /**
   * Retrieves all products from the local storage.
   *
   * @returns An observable of an array of added items.
   */
  getAllProducts(): Observable<IAddItems[]> {
    if (localStorage.getItem('products')) {
      this.temp = localStorage.getItem('products');
      this.items = JSON.parse(this.temp);
    }
    this.allItems = this.items;
    return ob<IAddItems[]>(this.items);
  }

  /**
   * Retrieves all product names from the local storage.
   *
   * @returns An observable of an array of product names.
   */
  getAllProductName(): Observable<string[]> {
    if (localStorage.getItem('products')) {
      this.temp = localStorage.getItem('products');
      this.temp = JSON.parse(this.temp);
      this.temp = Array.from(this.temp).map((val: any) => {
        return val.name;
      });
    }
    return ob<string[]>(this.temp);
  }

  /**
   * Searches for an item by name.
   *
   * @param val - The name to search for.
   * @returns An observable of an array of matching items.
   */
  searchItem(val: string): Observable<IAddItems[]> {
    this.temp = this.items.filter((e) => {
      return e.name === val;
    });
    return ob<IAddItems[]>(this.temp);
  }

  /**
   * Adds an item to the product list.
   *
   * @param data - The item data to add.
   * @returns An observable of the updated array of items.
   */
  addItems(data: IAddItems): Observable<IAddItems[]> {
    this.items.push(data);
    localStorage.setItem('products', JSON.stringify(this.items));
    return ob<IAddItems[]>(this.items);
  }

  /**
   * Deletes an item from the product list.
   *
   * @param item - The item to delete.
   */

  deleteItem(item: IAddItems) {
    this.temp = Array.from(this.items).filter((e: any) => {
      return e.id !== item.id;
    });
    this.items = this.temp;
    this.updateStorage();
  }

  /**
   * Edits an item in the product list.
   *
   * @param data - The updated item data.
   */
  editItem(data: IAddItems) {
    this.temp = data;
    this.edit = true;
  }

  /**
   * Updates an item in the product list.
   *
   * @param data - The updated item data.
   */
  updateItem(data: IAddItems) {
    this.items.forEach((val: IAddItems, i) => {
      if (val.id === data.id) {
        this.items[i] = data;
        this.updateStorage();
      }
    });
  }

  /**
   * Sells an item and adds it to the sold items list.
   *
   * @param data - The item data to sell.
   * @returns An observable of the updated array of sold items.
   */
  sellItem(data: ISellItems): Observable<ISellItems[]> {
    this.soldItems.push(data);
    this.decQuantity(data);
    localStorage.setItem('soldItems', JSON.stringify(this.soldItems));
    return ob<ISellItems[]>(this.soldItems);
  }

  /**
   * Counts the number of sold products by name.
   *
   * @returns An object representing the count of sold products by name.
   */
  productCount(): {} {
    const productName = this.soldItems.map((item) => {
      return item.name;
    });
    this.countName = this.countElements(productName);
    return this.countName;
  }

  getProductBackgroundColor(val: any): string {
    for (let key in this.countName) {
      if (val.name === key) {
        if (this.countName[key] >= 10) {
          return '#009900';
        } else if (this.countName[key] <= 10 && this.countName[key] >= 5) {
          return '#E8C919';
        } else {
          return '#990000';
        }
      }
    }
    return 'none';
  }

  /**
   * Counts the occurrences of elements in an array.
   *
   * @param arr - The array to count elements from.
   * @returns An object representing the count of elements.
   */
  countElements(arr: any) {
    let counts: any = {};

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

  /**
   * Retrieves all sold products from the local storage.
   *
   * @returns An observable of an array of sold items.
   */
  getAllSoldProducts(): Observable<ISellItems[]> {
    if (localStorage.getItem('soldItems')) {
      this.temp = localStorage.getItem('soldItems');
      this.soldItems = JSON.parse(this.temp);
    }
    return ob<ISellItems[]>(this.soldItems);
  }

  /**
   * Decreases the quantity of a sold item from the product list.
   *
   * @param val - The sold item data.
   */
  decQuantity(val: ISellItems) {
    this.items.forEach((x: any, i) => {
      if (
        val.name === x.id &&
        x.numberGroup.quantity >= val.numberGroup.quantity
      ) {
        x.numberGroup.quantity -= val.numberGroup.quantity;
        this.items[i] = x;
        return true;
      } else {
        return false;
      }
    });
    this.updateStorage();
  }
}

/**
 * An observable creation function with a delay.
 *
 * @param ob - The value to be emitted as an observable.
 * @returns An observable of the given value with a delay.
 */
export function ob<T = any>(ob: T) {
  return of(ob).pipe(delay(delayNumber()));
}

/**
 * Generates a random delay number between a start time and end time.
 *
 * @returns A random delay number.
 */
export function delayNumber(): number {
  const startTime = 500;
  const endTime = 2500;
  return Math.random() * (endTime - startTime + startTime);
}
