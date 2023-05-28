import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { IAddItems } from 'src/app/common/model/Productmodel';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})

/**

Represents the AddItemsComponent.
@class
*/
export class AddItemsComponent implements OnInit {

  /**
  
  Represents the add products form group.
  @type {FormGroup}
  */

  addProducts!: FormGroup;

  /**
  
  Constructs a new AddItemsComponent.
  @constructor
  @param {FormBuilder} _formBuilder - The FormBuilder instance.
  @param {ProductsService} service - The ProductsService instance.
  @param {Router} router - The Router instance.
  */
  constructor(private _formBuilder: FormBuilder, private service: ProductsService, private router: Router) {
  }

  /**

Initializes the component.
@method
*/
  ngOnInit(): void {
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
    this.service.getAllProducts().subscribe(
      {
        next: (data: IAddItems[]) => {
        }
      }
    );

  }

  /**

Represents the sum of prices and quantities.
@type {number}
*/
  sum!: number;

  /**

Represents whether the form is in edit mode or not.
@type {boolean}
*/
  edit: boolean = false;

  /**
  
  Loads data for editing.
  @method
  */
  loadData() {
    this.addProducts.patchValue({
      id: this.service.temp.id,
      name: this.service.temp.name,
      description: this.service.temp.description,
      numberGroup: {
        quantity: this.service.temp.numberGroup.quantity,
        price: this.service.temp.numberGroup.price
      },
      total: this.service.temp.total
    })
    this.service.temp = null;
  }

  /**

Performs calculation of the total based on price and quantity.
@method
@param {object} val - The object containing price and quantity values.
*/
  calculation(val: { price: number, quantity: number }): void {
    this.sum = +val.price * +val.quantity;
    this.addProducts.get('total')!.patchValue(this.sum);
  }

  /**

Handles the add button click event.
@method
*/
  onAdd(): void {
    LoaderService.show();
    this.addProducts.patchValue({
      id: this.addProducts.value.name,
      numberGroup: {
        price: +this.addProducts.value.numberGroup.price,
        quantity: +this.addProducts.value.numberGroup.quantity,
      }
    })
    this.service.addItems(this.addProducts.value).subscribe(
      {
        next: () => { },
        complete: () => {
          LoaderService.hide();
          this.router.navigate(['/product']);
        }
      }
    );
  }

  /**

Handles the edit button click event.
@method
*/
  onEdit() {
    this.addProducts.patchValue({
      id: this.addProducts.value.id,
      name: this.addProducts.value.name,
      description: this.addProducts.value.description,
      numberGroup: {
        quantity: this.addProducts.value.numberGroup.quantity,
        price: this.addProducts.value.numberGroup.price
      },
      total: this.addProducts.value.total
    })
    this.service.updateItem(this.addProducts.value);
    this.router.navigate(['/product']);

  }

}

