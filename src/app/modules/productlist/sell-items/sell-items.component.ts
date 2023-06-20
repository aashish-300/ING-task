import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {InvoiceNumber, ISellItems, TotalCalulationModel,} from '../../../model';
import {LoaderService, ProductsService} from '../../../service';
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-sell-items',
  templateUrl: './sell-items.component.html',
  styleUrls: ['./sell-items.component.css'],
})

/**

 Represents the SellItemsComponent.
@class
*/
export class SellItemsComponent implements OnInit, OnDestroy  {

  private unsubscribe$ = new Subject<void>();

  /**

Constructs a new SellItemsComponent.
@constructor
@param {FormBuilder} formBuilder - The FormBuilder instance.
@param {ProductsService} service - The ProductsService instance.
@param {Router} router - The Router instance.
*/
  constructor(
    private formBuilder: FormBuilder,
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

    this.sellItems = this.formBuilder.group({
      id: ['', Validators.required],
      invoice: ['', Validators.required],
      name: ['', Validators.required],
      numberGroup: this.formBuilder.group({
        quantity: ['', Validators.required],
        price: ['', Validators.required],
      }),
      total: [Number, Validators.required],
      customerName: ['', Validators.required],
      address: ['', Validators.required],
      remark: ['', Validators.required],
      date: ['', Validators.required],
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

    this.sellItems.get('name')?.valueChanges.subscribe((name) => {
      const item = this.service.getProductById(name);
      this.sellItems.get('numberGroup.price')?.patchValue(item.numberGroup.price)
    })
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
        this.router.navigate(['/dashboard']);
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
