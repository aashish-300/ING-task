import {Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import {IAddItems, ISellItems} from '../model';
import {colors} from "../constants";

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


export class ProductsService {
  constructor() {}

  /**
   * Updates the local storage with the current item list.
   */
  private updateStorage(items: IAddItems[]): void {
    localStorage.setItem('products', JSON.stringify(items));
  }

  public getProductById(id: string) {
    let item = localData('products');
    if (!item) return;
    item = item.find((e: IAddItems) => {
      if (e.id === id) return e;
      return;
    });
    return item[0];
  }

  /**
   * Retrieves all products from the local storage.
   *
   * @returns An observable of an array of added items.
   */
  public getAllProducts(): Observable<IAddItems[]> {
    let items = localData('products');
    return obs<IAddItems[]>(items);
  }

  /**
   * Retrieves all product names from the local storage.
   *
   * @returns An observable of an array of product names.
   */
  public getAllProductName(): Observable<string[]> {
    let productName = localData('products');
    if(!productName) return obs<string[]>([]);
    productName = productName.map((val:IAddItems) => val.name)
    return obs<string[]>(productName);
  }

  /**
   * Searches for an item by name.
   *
   * @param val - The name to search for.
   * @returns An observable of an array of matching items.
   */
  public searchItem(val: string): Observable<IAddItems[]> {
    let item = localData('products');
    if(!item) return obs<IAddItems[]>([]);
    item = item.filter((e: IAddItems): string => {
      if (e.name === val) return e.name;
      return '';
    });
    return obs<IAddItems[]>(item);
  }

  /**
   * Adds an item to the product list.
   *
   * @param data - The item data to add.
   * @returns An observable of the updated array of items.
   */
  public addItems(data: IAddItems): Observable<IAddItems[]> {
    let item = localData('products');
    if(!item) return obs<IAddItems[]>([])
    item.push(data);
    localStorage.setItem('products', JSON.stringify(item));
    return obs<IAddItems[]>(item);
  }

  /**
   * Deletes an item from the product list.
   *
   * @param item - The item to delete.
   */

  public deleteItem(item: IAddItems): void {
    let items = localData('products');
    if(!items) return ;
    items = items.filter((e: any) => {
      return e.id !== item.id;
    });
    this.updateStorage(items);
  }


  /**
   * Updates an item in the product list.
   *
   * @param data - The updated item data.
   */
  public updateItem(data: IAddItems) {
    let items;
    if (localStorage.getItem('products')) {
      items = localStorage.getItem('products');
      if (!items) return;
      items = JSON.parse(items!);
    }
    items.forEach((val: IAddItems, i: number) => {
      if (val.id === data.id) {
        items[i] = data;
      }
    });
    this.updateStorage(items);
  }

  /**
   * Sells an item and adds it to the sold items list.
   *
   * @param data - The item data to sell.
   * @returns An observable of the updated array of sold items.
   */
  public sellItem(data: ISellItems): Observable<ISellItems[]> {
    let items;
    if (localStorage.getItem('soldItems')) {
      items = localStorage.getItem('soldItems');
      if (!items) return obs<ISellItems[]>([]);
      items = JSON.parse(items!);
    }
    items.push(data);
    this.decQuantity(data);
    localStorage.setItem('soldItems', JSON.stringify(items));
    return obs<ISellItems[]>(items);
  }

  /**
   * Counts the number of sold products by name.
   *
   * @returns An object representing the count of sold products by name.
   */
  public productCount() {
    let items = localData('soldItems');
    const productName:string[] = items.map((item:ISellItems) => {
      return item.name;
    });
    const countName = this.countElements(productName);
    return countName;
  }

  public getProductBackgroundColor(val: any): string {
    const countName = this.productCount(); //for sold item
    for (let key in countName) {
      if (val.name === key) {
        if (countName[key] >= 10) {
          return colors.green;
        } else if (countName[key] <= 10 && countName[key] >= 5) {
          return colors.yellow;
        } else {
          return colors.red;
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
  public countElements(arr: string[]) {
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
  public getAllSoldProducts(): Observable<ISellItems[]> {
    let items = localData('soldItems');
    if (!items) return obs<ISellItems[]>([]);
    return obs<ISellItems[]>(items);
  }

  /**
   * Decreases the quantity of a sold item from the product list.
   *
   * @param val - The sold item data.
   */
  public decQuantity(val: ISellItems) {
    let items;
    if (localStorage.getItem('products')) {
      items = localStorage.getItem('products');
      if (!items) return;
      items = JSON.parse(items!);
    }
    items.forEach((x: IAddItems, i: number) => {
      if (
        val.name === x.id &&
        x.numberGroup.quantity >= val.numberGroup.quantity
      ) {
        x.numberGroup.quantity -= val.numberGroup.quantity;
        items[i] = x;
        return true;
      } else {
        return false;
      }
    });
    this.updateStorage(items);
  }
}


export function localData(key:string){
  let items;
  if (localStorage.getItem(key)){
    items = localStorage.getItem(key);
    if (!items) return;
    items = JSON.parse(items!);
  }
  return items;
}
/**
 * An observable creation function with a delay.
 *
 * @param ob - The value to be emitted as an observable.
 * @returns An observable of the given value with a delay.
 */
export function obs<T = any>(obs: T) {
  return of(obs).pipe(delay(delayNumber()));
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
