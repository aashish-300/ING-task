import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  ISellItems,
  TotalCalulationModel,
  InvoiceNumber,
} from 'src/app/common/model/Productmodel';
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
  getTotal!: TotalCalulationModel;
  invoiceNumber!: InvoiceNumber;
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
    this.invoiceNumber = new InvoiceNumber();
    this.service.getAllSoldProducts().subscribe({
      next: () => {},
    });
    this.sellItems.patchValue({
      invoice: this.invoiceNumber.invoice,
    });
    this.service.getAllProductName().subscribe({
      next: (x) => {
        this.products = x;
      },
      complete: () => {},
    });

    this.sellItems.get('numberGroup')?.valueChanges.subscribe((val) => {
      this.getTotal = new TotalCalulationModel(val);
      this.sellItems.get('total')!.patchValue(this.getTotal.sum);
    });

    this.service.productCount();
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
export function currentDate(): Date {
  return new Date();
}
