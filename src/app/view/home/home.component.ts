import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs';
import {
  ISellItems,
  IProductSoldCount,
} from 'src/app/common/model/Productmodel';
import { LoaderService } from 'src/app/service/loader.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

/**
Represents the HomeComponent.
@class
*/
export class HomeComponent implements OnInit {
  /**

Constructs a new HomeComponent.
@constructor
@param {ProductsService} service - The ProductsService instance.
*/

  constructor(private service: ProductsService) {}

  /**

Represents the invoice number.
@type {number|string}
*/
  invoiceno!: number | string;

  /**

Represents the products.
@type {any}
*/
  products: any;

  /**

Represents the product sold count.
@type {IProductSoldCount}
*/
  ProductSoldCount: IProductSoldCount = {
    today: 0,
    popular: 0,
    total: 0,
  };

  /**

Initializes the component.
@method
*/
  ngOnInit(): void {
    this.getAllSoldProducts();
  }

  /**

Retrieves all sold products.
@method
*/
  getAllSoldProducts() {
    LoaderService.show();
    this.service.getAllSoldProducts().subscribe({
      next: (data: ISellItems[]) => {
        this.products = data;
      },
      complete: () => {
        LoaderService.hide();
        this.service.productCount();
        this.productCount();
      },
    });
  }

  /**

Counts the number of products.
@method
*/
  productCount() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let fullDate = `${day}-${month}-${year}`;

    this.products.forEach((item: ISellItems) => {
      this.ProductSoldCount.popular = 0;
      if (item.date === fullDate) {
        ++this.ProductSoldCount.today;
      }
      for (let key in this.service.countName) {
        if (Number(this.service.countName[key]) >= 5) {
          ++this.ProductSoldCount.popular;
        }
      }

      this.ProductSoldCount.total =
        this.ProductSoldCount.today + this.ProductSoldCount.popular;
    });
  }
}
