import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { AuthService } from 'src/app/service/auth.service';
import { IAddItems } from 'src/app/model/Productmodel';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private service: ProductsService, private authService: AuthService) {
    // this.getAllProducts();
  }

  invoiceno!: string;
  products: IAddItems[] = [];
  role!: string | undefined;

  ngOnInit(): void {
    this.getAllProducts();
    this.authService.getUserRole().subscribe(
      {
        next: (data: string | undefined) => this.role = data
      }
    );
  }

  loadProducts() {
    this.service.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
      }
    });
  }

  getAllProducts() {
    this.service.getAllProducts().subscribe(data => {
      this.products = data;
    });
    console.log(this.products);
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
