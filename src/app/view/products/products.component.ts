import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { AuthService } from 'src/app/service/auth.service';
import { IAddItems } from 'src/app/common/model/Productmodel';
import { LoaderService } from 'src/app/service/loader.service';

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
    private authService: AuthService
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
    this.authService.getUserRole().subscribe({
      next: (data: any) => (this.role = data),
    });
    console.log(this.role);
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

  /**

Gets the background color for a product based on its count.
@method
@param {any} val - The value to check.
@returns {string} - The background color.
*/
  getProductBackgroundColor(val: any): string {
    for (let key in this.countName) {
      if (val.name === key) {
        if (this.countName[key] >= 10) {
          return 'green';
        } else if (this.countName[key] <= 10 && this.countName[key] >= 5) {
          return '#F1EE48';
        } else {
          return 'red';
        }
      }
    }
    return 'none';
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
  loadProducts() {
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

  getAllProducts() {
    LoaderService.show();
    this.service.getAllProducts().subscribe({
      next: (data: IAddItems[]) => {
        this.products = data;
      },
      complete: () => {
        LoaderService.hide();
      },
    });
  }

  onAdd() {
    this.service.edit = false;
  }

  onEdit(data: IAddItems) {
    this.service.editItem(data);
  }

  onDelete(data: IAddItems): void {
    this.service.deleteItem(data);
    this.loadProducts();
  }
}
