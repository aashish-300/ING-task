import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ISellItems } from 'src/app/model/Productmodel';
import { LoaderService } from 'src/app/service/loader.service';

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
      numberGroup: this._formBuilder.group({
        quantity: ['', Validators.required],
        price: ['', Validators.required],
      }),
      total: [Number, Validators.required],
      customerName: ['ing', Validators.required],
      address: ['naxal', Validators.required],
      remark: ['send', Validators.required],
    })
  }

  sellItems!: FormGroup;
  sum!: number;
  products!: string[];

  ngOnInit(): void {
    this.service.getAllProductName().subscribe(
      {
        next: (x) => { this.products = x; },
        complete: () => { }
      },
    )

    this.sellItems.get('numberGroup')?.valueChanges.subscribe(val => {
      if (!(val.price && val.quantity)) return;
      this.calculation(val);
    })

  }

  calculation(val: { price: number, quantity: number }): void {
    this.sum = +val.price * +val.quantity;
    this.sellItems.get('total')!.patchValue(this.sum);
  }

  onSell() {
    LoaderService.show();
    this.sellItems.patchValue({
      id: this.sellItems.value.invoice,
      numberGroup: {
        price: +this.sellItems.value.numberGroup.price,
        quantity: +this.sellItems.value.numberGroup.quantity,
      },
      total: +this.sellItems.value.total
    })

    this.service.sellItem(this.sellItems.value).subscribe(
      {
        next: () => { },
        complete: () => {
          LoaderService.hide();
          this.router.navigate(['/']);
        }
      }
    )
  }



}
