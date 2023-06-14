import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  InvoiceNumber,
  TotalCalulationModel,
} from 'src/app/model/Productmodel';
import { LoaderService } from 'src/app/service/loader.service';
import { ProductsService } from 'src/app/service/products.service';

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
  ) {}

  /**

Represents the sell items form group.
@type {FormGroup}
*/
  public sellItems!: FormGroup;
  /**

Represents the list of products.
@type {string[]}
*/
  public products!: string[];

  /**

Initializes the component.
@method
*/
  ngOnInit(): void {
    this.sellItems = this._formBuilder.group({
      id: ['', Validators.required],
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
    this.service.getAllSoldProducts().subscribe({
      next: () => {},
    });
    this.sellItems.patchValue({
      invoice: new InvoiceNumber().invoice,
    });
    this.service.getAllProductName().subscribe({
      next: (x) => {
        this.products = x;
      },
    });

    this.sellItems.get('numberGroup')?.valueChanges.subscribe((val) => {
      this.sellItems
        .get('total')!
        .patchValue(new TotalCalulationModel(val).sum);
    });

    this.service.productCount();
  }

  /**

Performs the selling of items.
@method
*/
  public onSell() {
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
export function currentDate(): Date {
  return new Date();
}
