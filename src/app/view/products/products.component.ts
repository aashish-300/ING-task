import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private service: ProductsService, private authService: AuthService) {
    // this.getAllProducts();
  }

  invoiceno: any;
  products: any = [];
  role: any;

  ngOnInit(): void {
    this.getAllProducts();
    this.role = this.authService.getUserRole();
  }

  loadProducts() {
    this.products = this.service.getAllProducts();
  }

  getAllProducts() {
    this.products = this.service.getAllProducts();
    // console.log(this.products);
  }

  onAdd() {
    this.service.edit = false;
  }

  onEdit(data: any) {
    this.service.editItem(data);
  }

  onDelete(data: any): void {
    this.service.deleteItem(data);
    this.loadProducts();
    // this.service.deleteItem(data.id).subscribe(res => {
    //   this.getAllProducts();
    // });
  }
}
