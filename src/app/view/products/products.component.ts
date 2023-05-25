import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { AuthService } from 'src/app/service/auth.service';
import { IAddItems } from 'src/app/model/Productmodel';
import { LoaderService } from 'src/app/service/loader.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private service: ProductsService, private authService: AuthService) {
  }

  invoiceno!: string;
  products: IAddItems[] = [];
  role!: string | undefined;

  ngOnInit(): void {
    this.getAllProducts();
    this.authService.getUserRole().subscribe(
      {
        next: (data: string | undefined) => this.role = data,
      },
    );
  }

  loadProducts() {
    LoaderService.show();
    this.service.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
      },
      complete: () => {
        LoaderService.hide();
      }
    });
  }

  getAllProducts() {
    LoaderService.show();
    this.service.getAllProducts().subscribe(
      {
        next: (data: IAddItems[]) => {
          this.products = data;
        },
        complete: () => {
          LoaderService.hide();
        }
      }
    )
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
