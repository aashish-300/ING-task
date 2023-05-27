import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  constructor(private _formBuilder: FormBuilder, private service: ProductsService, private authService: AuthService) {
  }

  invoiceno!: string;
  products: IAddItems[] = [];
  role!: string;
  searchItem!: FormGroup;
  productName: string[] = [];
  searchProductName: string[] = [];
  green: boolean = true;
  countName!: any;

  ngOnInit(): void {
    this.authService.getUserRole().subscribe(
      {
        next: (data: any) => this.role = data,
      },
    );
    console.log(this.role)
    this.getAllProducts();
    this.service.getAllSoldProducts().subscribe(
      {
        next: () => { },
        complete: () => {
          this.countName = this.service.productCount();
        }
      }
    )
    this.service.getAllProductName().subscribe(
      {
        next: (data: string[]) => this.productName = data,
      },
    )
    this.searchItem = this._formBuilder.group({
      productNameInput: ['', Validators.required]
    })
    this.searchItem.get('productNameInput')?.valueChanges.subscribe(
      {
        next: (data) => {
          this.searchProductName = this.productName.filter(s => {
            if (data === '') return;
            return s.match(data)
          })
        },
      }
    )
  }

  getProductBackgroundColor(val: any): string {
    for (let key in this.countName) {
      if (val.name === key) {
        if (this.countName[key] >= 10) {
          return 'green';
        } else if (this.countName[key] <= 10 && this.countName[key] >= 5) {
          return '#F1EE48';
        } else {
          return 'red';
        }
      }
    }
    return 'none'
  }

  searchClick(item: string): void {
    this.searchItem.value.productNameInput = ' ';
    this.service.searchItem(item).subscribe(
      {
        next: (val) => this.products = val
      });
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
