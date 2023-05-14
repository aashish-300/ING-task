import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent {

  constructor(private service: ProductsService ,private router: Router) { 
    console.log('session service')
     console.log(this.service.temp);
     if(this.service.temp){
      this.loadData();
      this.edit= true;
     }
  }
  sum: any;
  edit: boolean= false;

  addProducts = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    quantity: new FormControl(0),
    price: new FormControl(0),
    total: new FormControl(0),
  })

  loadData(){
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
    console.log(this.sum);
    console.log(this.addProducts.value.total)
    this.addProducts.patchValue({
      total: this.sum
    })
  }

  onAdd() {
    console.log(this.addProducts.value)
    this.service.addItems(this.addProducts.value).subscribe(res => {
      this.router.navigate(['/product']);
    })
  }

  onEdit(){
    this.addProducts.patchValue({
      id: this.addProducts.value.id,
      name: this.addProducts.value.name,
      description: this.addProducts.value.description,
      quantity: this.addProducts.value.quantity,
      price: this.addProducts.value.price,
      total: this.addProducts.value.total
    })

    this.service.editItem(this.addProducts.value.id, this.addProducts.value).subscribe(res => {
      this.router.navigate(['/product']);
    })
  }

}
