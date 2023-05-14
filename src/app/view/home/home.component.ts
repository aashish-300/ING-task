import { Component } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private service: ProductsService){
    this.getAllSoldProducts();
  }

  invoiceno: any;
  products: any;
  
  getAllSoldProducts(){
    this.service.getAllSoldProducts().subscribe(res => {
      this.products = res;
      console.log(this.products);
    })
  }
}
