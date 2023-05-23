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

  invoiceno!: number | string;
  products: any;

  ngOnInit(): void {
    this.getAllSoldProducts();
  }

  getAllSoldProducts() {
    this.service.getAllSoldProducts().subscribe(
      {
        next: (data: any) => {
          this.products = data;
        }
      });
    console.log(this.products);
  }
}
