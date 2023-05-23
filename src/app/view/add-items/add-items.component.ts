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

  }

  ngOnInit(): void {
    // https://angular.io/guide/observables-in-angular
    this.addProducts = this._formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      numberGroup: this._formBuilder.group({
        quantity: ['', Validators.required],
        price: ['', Validators.required],
      }),
      total: ['', Validators.required],
    });
    this.addProducts.get('numberGroup')?.valueChanges.subscribe(val => {
    if (!(val.price && val.quantity)) return;
      this.calculation(val);
    })
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
      numberGroup: {
        quantity: this.service.temp.quantity,
        price: this.service.temp.price
      },
      total: this.service.temp.total
    })
    this.service.temp = null;
  }

  calculation(val: any): any {
    this.sum = +val.price * +val.quantity;
    this.addProducts.get('total')!.patchValue(this.sum);
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
      numberGroup: {
        quantity: this.service.temp.quantity,
        price: this.service.temp.price
      },
      total: this.addProducts.value.total
    })
    this.service.updateItem(this.addProducts.value);
    this.router.navigate(['/product']);

  }

}
