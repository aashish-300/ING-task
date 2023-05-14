import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private service: ProductsService){
    this.getAllProducts();
  }

  invoiceno: any;
  products: any;
  
  getAllProducts(){
    this.service.getAllProducts().subscribe(res => {
      this.products = res;
    })
  }

  onEdit(data: any) {
    this.service.temp = data;
  }

  onDelete(data: any): void {
    this.service.deleteItem(data.id).subscribe(res => {
      this.getAllProducts();
    });
  }
}
