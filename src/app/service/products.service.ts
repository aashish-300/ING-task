import {Injectable, OnInit} from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import {IAddItems, ISellItems} from '../model';

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
  constructor() {}

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
    // this.getAllSoldProducts().subscribe({
    //   next: (item: ISellItems[]) => {},
    //   // complete: () => this.productCount(),
    // });
  }

  /**
   * Updates the local storage with the current item list.
   */
  updateStorage(items: IAddItems[]): void {
    localStorage.setItem('products', JSON.stringify(items));
  }

  getProductById(id: string) {
    let item;
    if (localStorage.getItem('products')) {
      item = localStorage.getItem('products');
      if (item) item = JSON.parse(item!);
    }
    if (!item) return;
    item = item.filter((e: IAddItems) => {
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
    return ob<IAddItems[]>(items);
  }

  /**
   * Retrieves all product names from the local storage.
   *
   * @returns An observable of an array of product names.
   */
  getAllProductName(): Observable<string[]> {
    let productName = localData('products');
    if(!productName) return ob<string[]>([]);
    productName = productName.map((val:IAddItems) => val.name)
    return ob<string[]>(productName);
  }

  /**
   * Searches for an item by name.
   *
   * @param val - The name to search for.
   * @returns An observable of an array of matching items.
   */
  searchItem(val: string): Observable<IAddItems[]> {
    let item = localData('products');
    if(!item) return ob<IAddItems[]>([]);
    item = item.filter((e: IAddItems): string => {
      if (e.name === val) return e.name;
      return '';
    });
    return ob<IAddItems[]>(item);
  }

  /**
   * Adds an item to the product list.
   *
   * @param data - The item data to add.
   * @returns An observable of the updated array of items.
   */
  addItems(data: IAddItems): Observable<IAddItems[]> {
    let item = localData('products');
    if(!item) return ob<IAddItems[]>([])
    item.push(data);
    localStorage.setItem('products', JSON.stringify(item));
    return ob<IAddItems[]>(item);
  }

  /**
   * Deletes an item from the product list.
   *
   * @param item - The item to delete.
   */

  deleteItem(item: IAddItems): void {
    let items = localData('products');
    if(!items) return ;
    items = items.filter((e: any) => {
      return e.id !== item.id;
    });
    this.updateStorage(items);
  }

  /**
   * Edits an item in the product list.
   *
   * @param data - The updated item data.
   */
  public editItem(data: IAddItems) {
    this.edit = true;
  }

  /**
   * Updates an item in the product list.
   *
   * @param data - The updated item data.
   */
  updateItem(data: IAddItems) {
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
  sellItem(data: ISellItems): Observable<ISellItems[]> {
    let items;
    if (localStorage.getItem('soldItems')) {
      items = localStorage.getItem('soldItems');
      if (!items) return ob<ISellItems[]>([]);
      items = JSON.parse(items!);
    }
    items.push(data);
    this.decQuantity(data);
    localStorage.setItem('soldItems', JSON.stringify(items));
    return ob<ISellItems[]>(items);
  }

  /**
   * Counts the number of sold products by name.
   *
   * @returns An object representing the count of sold products by name.
   */
  public productCount(): {} {
    let items = localData('soldItems');
    const productName:string[] = items.map((item:ISellItems) => {
      return item.name;
    });
    const countName = this.countElements(productName);
    console.log('count name',countName)
    return countName;
  }

  public getProductBackgroundColor(val: IAddItems | ISellItems): string {
    const countName:any = this.productCount();
    for (let key in countName) {
      console.log(val.name ,key)
      if (val.name === key) {
        if (countName[key] >= 10) {
          return '#009900';
        } else if (this.countName[key] <= 10 && this.countName[key] >= 5) {
          return '#E8C919';
        } else {
          return '#990000';
        }
      }else return 'none'
    }
    return 'none';
  }

  /**
   * Counts the occurrences of elements in an array.
   *
   * @param arr - The array to count elements from.
   * @returns An object representing the count of elements.
   */
  countElements(arr: string[]) {
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
    let items;
    if (localStorage.getItem('soldItems')) {
      items = localStorage.getItem('soldItems');
      items = JSON.parse(items!);
    }
    return ob<ISellItems[]>(items);
  }

  /**
   * Decreases the quantity of a sold item from the product list.
   *
   * @param val - The sold item data.
   */
  decQuantity(val: ISellItems) {
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
