import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ISellItems } from 'src/app/common/model/Productmodel';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-sell-items',
  templateUrl: './sell-items.component.html',
  styleUrls: ['./sell-items.component.css'],
})

/**

Represents the SellItemsComponent.
@class
*/
export class SellItemsComponent implements OnInit {
  /**

Constructs a new SellItemsComponent.
@constructor
@param {FormBuilder} _formBuilder - The FormBuilder instance.
@param {ProductsService} service - The ProductsService instance.
@param {Router} router - The Router instance.
*/
  constructor(
    private _formBuilder: FormBuilder,
    private service: ProductsService,
    private router: Router
  ) {
    this.sellItems = this._formBuilder.group({
      id: ['asdf', Validators.required],
      invoice: ['', Validators.required],
      name: ['', Validators.required],
      numberGroup: this._formBuilder.group({
        quantity: ['', Validators.required],
        price: ['', Validators.required],
      }),
      total: [Number, Validators.required],
      customerName: ['', Validators.required],
      address: ['', Validators.required],
      remark: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  /**

Represents the sell items form group.
@type {FormGroup}
*/
  sellItems!: FormGroup;
  /**

Represents the sum of price and quantity.
@type {number}
*/
  sum!: number;
  /**

Represents the list of products.
@type {string[]}
*/
  products!: string[];

  /**

Initializes the component.
@method
*/
  ngOnInit(): void {
    this.service.getAllSoldProducts().subscribe({
      next: () => {},
    });
    this.sellItems.patchValue({
      invoice: this.invoiceNum(),
    });
    this.service.getAllProductName().subscribe({
      next: (x) => {
        this.products = x;
      },
      complete: () => {},
    });

    this.sellItems.get('numberGroup')?.valueChanges.subscribe((val) => {
      if (!(val.price && val.quantity)) return;
      this.calculation(val);
    });

    this.service.productCount();
  }

  /**

Generates an invoice number.
@returns {number} - The generated invoice number.
*/
  invoiceNum(): number {
    return Math.floor(Math.random() * (99999 - 10000 + 10000));
  }

  /**

Performs the calculation of the total based on price and quantity.
@param {Object} val - The object containing price and quantity.
@method
*/
  calculation(val: { price: number; quantity: number }): void {
    this.sum = +val.price * +val.quantity;
    this.sellItems.get('total')!.patchValue(this.sum);
  }

  /**

Performs the selling of items.
@method
*/
  onSell() {
    LoaderService.show();
    this.sellItems.patchValue({
      id: this.sellItems.value.invoice,
      numberGroup: {
        price: +this.sellItems.value.numberGroup.price,
        quantity: +this.sellItems.value.numberGroup.quantity,
      },
      total: +this.sellItems.value.total,
      date: currentDate(),
    });

    this.service.sellItem(this.sellItems.value).subscribe({
      next: () => {},
      complete: () => {
        LoaderService.hide();
        this.router.navigate(['/']);
      },
    });
  }
}

/**

Returns the current date in the format 'day-month-year'.
@returns {string} - The current date.
@function
*/
export function currentDate(): string {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
