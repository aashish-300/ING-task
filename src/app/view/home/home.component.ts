import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: ProductsService) {
  }

  invoiceno: any;
  products: any;

  ngOnInit(): void {
    this.getAllSoldProducts();
  }

  getAllSoldProducts() {
    this.products = this.service.getAllSoldProducts();
    console.log(this.products);
  }
}
