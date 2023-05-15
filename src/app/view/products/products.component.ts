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
  constructor(private service: ProductsService,private authService: AuthService){
    this.getAllProducts();
  }


  
  invoiceno: any;
  products: any;
  role: any;
  
  ngOnInit(): void {
      this.role = this.authService.getUserRole();
  }

  getAllProducts(){
    this.service.getAllProducts().subscribe(res => {
      this.products = res;
    })
  }

  onEdit(data: any) {
    console.log(data);
    this.service.temp = data;
  }

  onDelete(data: any): void {
    this.service.deleteItem(data.id).subscribe(res => {
      this.getAllProducts();
    });
  }
}
