import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs';
import { ISellItems, IProductSoldCount } from 'src/app/model/Productmodel';
import { LoaderService } from 'src/app/service/loader.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: ProductsService) {
  }

  invoiceno!: number | string;
  products: any;
  ProductSoldCount: IProductSoldCount = {
    today: 0,
    popular: 0,
    total: 0,
  }

  ngOnInit(): void {
    this.getAllSoldProducts();
  }

  getAllSoldProducts() {
    LoaderService.show();
    this.service.getAllSoldProducts().subscribe(
      {
        next: (data: ISellItems[]) => {
          this.products = data;
        },
        complete: () => {
          LoaderService.hide();
          this.service.productCount()
          this.productCount()
        }
      });
  }

  productCount() {

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let fullDate = `${day}-${month}-${year}`


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

      this.ProductSoldCount.total = this.ProductSoldCount.today + this.ProductSoldCount.popular
    })
  }

}
