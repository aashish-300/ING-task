import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { AuthService } from 'src/app/service/auth.service';
import { IAddItems } from 'src/app/common/model/Productmodel';
import { LoaderService } from 'src/app/service/loader.service';
import { ExcelService } from 'src/app/service/excel.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})

/**

Represents the ProductsComponent.
@class
*/
export class ProductsComponent implements OnInit {
  /**

Constructs a new ProductsComponent.
@constructor
@param {FormBuilder} _formBuilder - The FormBuilder instance.
@param {ProductsService} service - The ProductsService instance.
@param {AuthService} authService - The AuthService instance.
*/
  constructor(
    private _formBuilder: FormBuilder,
    private service: ProductsService,
    private authService: AuthService,
    private excelService: ExcelService
  ) {}

  /**

Represents the invoice number.
@type {string}
*/
  invoiceno!: string;
  /**

Represents the list of products.
@type {IAddItems[]}
*/
  products: IAddItems[] = [];
  /**

Represents the user's role.
@type {string}
*/
  role!: string;
  /**

Represents the search item form group.
@type {FormGroup}
*/
  searchItem!: FormGroup;
  /**

Represents the list of product names.
@type {string[]}
*/
  productName: string[] = [];
  /**

Represents the list of search product names.
@type {string[]}
*/
  searchProductName: string[] = [];
  /**

Represents the count name.
@type {any}
*/
  countName!: any;

  /**

Initializes the component.
@method
*/
  ngOnInit(): void {
    console.log('products', this.products);
    this.authService.getUserRole().subscribe({
      next: (data: any) => (this.role = data),
    });
    this.getAllProducts();
    this.service.getAllSoldProducts().subscribe({
      next: () => {},
      complete: () => {
        this.countName = this.service.productCount();
      },
    });
    this.service.getAllProductName().subscribe({
      next: (data: string[]) => (this.productName = data),
    });
    this.searchItem = this._formBuilder.group({
      productNameInput: ['', Validators.required],
    });
    this.searchItem.get('productNameInput')?.valueChanges.subscribe({
      next: (data) => {
        this.searchProductName = this.productName.filter((s) => {
          if (data === '') return;
          return s.match(data);
        });
      },
    });
  }


  getProductBackgroundColor(val: any) {
    return this.service.getProductBackgroundColor(val);
  }

  /**

Performs a search based on the selected item.
@method
@param {string} item - The item to search for.
*/
  searchClick(item: string): void {
    this.searchItem.value.productNameInput = ' ';
    this.service.searchItem(item).subscribe({
      next: (val) => (this.products = val),
    });
  }

  /**

Loads all products.
@method
*/
  loadProducts(): void {
    LoaderService.show();
    this.service.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
      },
      complete: () => {
        LoaderService.hide();
      },
    });
  }
  /**
   * Fetches all products, updates the products array, and manages the loader display.
   * @returns {void}
   */
  getAllProducts(): void {
    LoaderService.show();
    this.service.getAllProducts().subscribe({
      /**
       * Callback function to handle the next value received from the observable.
       * Updates the products array with the received data.
       * @param {IAddItems[]} data - The array of products received from the observable.
       * @returns {void}
       */
      next: (data: IAddItems[]): void => {
        this.products = data;
      },
      /**
       * Callback function to handle the completion of the observable.
       * Hides the loader after the operation is complete.
       * @returns {void}
       */
      complete: (): void => {
        LoaderService.hide();
      },
    });
  }

  /**
   * Sets the edit flag in the service to false.
   * @returns {void}
   */
  onAdd(): void {
    this.service.edit = false;
  }

  /**
   * Calls the service to edit an item with the provided data.
   * @param {IAddItems} data - The item to be edited.
   * @returns {void}
   */
  onEdit(data: IAddItems): void {
    this.service.editItem(data);
  }

  /**
   * Calls the service to delete an item with the provided data and reloads the products.
   * @param {IAddItems} data - The item to be deleted.
   * @returns {void}
   */
  onDelete(data: IAddItems): void {
    this.service.deleteItem(data);
    this.loadProducts();
  }

  exportFile(): void {
    console.log('inside export ', this.products);
    const listITems = this.products.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        quantity: item.numberGroup.quantity,
        price: item.numberGroup.price,
        total: item.total,
      };
    });
    const columns = ['id', 'name', 'description', 'quantity', 'price', 'total'];

    this.excelService.exportAsExcelFile(
      'Product Reports',
      '',
      columns,
      listITems,
      '',
      'product-report',
      'sheet1'
    );
  }
}
