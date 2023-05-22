import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {

  addProducts!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private service: ProductsService, private router: Router) {

    this.addProducts = this._formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      total: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.edit = this.service.edit;
    if (this.edit) {
      this.loadData();
    }
    this.service.getAllProducts();
  }

  sum: any;
  edit: boolean = false;


  loadData() {
    this.addProducts.patchValue({
      id: this.service.temp.id,
      name: this.service.temp.name,
      description: this.service.temp.description,
      quantity: this.service.temp.quantity,
      price: this.service.temp.price,
      total: this.service.temp.total
    })
    this.service.temp = null;
  }

  calculation(): any {
    this.sum = Number(this.addProducts.value.price) * Number(this.addProducts.value.quantity);
    this.addProducts.patchValue({
      total: this.sum
    })
  }

  onAdd() {
    this.addProducts.patchValue({
      id: this.addProducts.value.name
    })
    this.service.addItems(this.addProducts.value);
    this.router.navigate(['/product']);
  }

  onEdit() {
    this.addProducts.patchValue({
      id: this.addProducts.value.id,
      name: this.addProducts.value.name,
      description: this.addProducts.value.description,
      quantity: this.addProducts.value.quantity,
      price: this.addProducts.value.price,
      total: this.addProducts.value.total
    })
    this.service.updateItem(this.addProducts.value);
    this.router.navigate(['/product']);

  }

}
