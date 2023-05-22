import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sell-items',
  templateUrl: './sell-items.component.html',
  styleUrls: ['./sell-items.component.css']
})
export class SellItemsComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private service: ProductsService, private router: Router) {
    this.sellItems = this._formBuilder.group({
      id: ['unique', Validators.required],
      invoice: ['unique', Validators.required],
      name: ['ing', Validators.required],
      quantity: [0, Validators.required],
      price: [0, Validators.required],
      total: [0, Validators.required],
      customerName: ['ing', Validators.required],
      address: ['naxal', Validators.required],
      remark: ['send', Validators.required],
    })
  }

  sellItems!: FormGroup;

  products: any;
  selectedItem: any;


  ngOnInit(): void {
    this.products = this.service.getAllProductName();
  }


  onSell() {
    this.sellItems.patchValue({
      id: this.sellItems.value.invoice
    })
    this.service.sellItem(this.sellItems.value)
    this.router.navigate(['/']);
  }



}
