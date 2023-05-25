import { Component, OnInit } from '@angular/core';
import { ISellItems } from 'src/app/model/Productmodel';
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
        }
      });
  }
}
