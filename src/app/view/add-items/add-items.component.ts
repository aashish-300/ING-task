import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import {
  IAddItems,
  TotalCalulationModel,
} from 'src/app/common/model/Productmodel';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'],
})

/**

Represents the AddItemsComponent.
@class
*/
export class AddItemsComponent implements OnInit {
  // getTotal!: TotalCalulationModel;
  /**
  
  Represents the add products form group.
  @type {FormGroup}
  */

  public addProducts!: FormGroup;

  /**
  
  Constructs a new AddItemsComponent.
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

Initializes the component.
@method
*/
  ngOnInit(): void {
    this.addProducts = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      numberGroup: this.formBuilder.group({
        quantity: ['', Validators.required],
        price: ['', Validators.required],
      }),
      total: ['', Validators.required],
    });
    this.edit = this.service.edit;
    if (this.edit) {
      this.loadData();
    }
    this.addProducts.get('numberGroup')?.valueChanges.subscribe((val) => {
      this.addProducts
        .get('total')!
        .patchValue(new TotalCalulationModel(val).sum);
    });
    this.service.getAllProducts().subscribe({
      next: () => {},
    });
  }

  /**

Represents whether the form is in edit mode or not.
@type {boolean}
*/
  public edit: boolean = false;

  /**
  
  Loads data for editing.
  @method
  */
  private loadData(): void {
    console.log('Loading data');
    this.addProducts.patchValue({
      id: this.service.temp.id,
      name: this.service.temp.name,
      description: this.service.temp.description,
      numberGroup: {
        quantity: this.service.temp.numberGroup.quantity,
        price: this.service.temp.numberGroup.price,
      },
      total: this.service.temp.total,
    });
    this.service.temp = null;
    console.log('Loading data');
  }

  /**

Handles the add button click event.
@method
*/
  public onAdd(): void {
    LoaderService.show();
    this.addProducts.patchValue({
      id: this.addProducts.value.name,
      numberGroup: {
        price: +this.addProducts.value.numberGroup.price,
        quantity: +this.addProducts.value.numberGroup.quantity,
      },
    });
    this.service.addItems(this.addProducts.value).subscribe({
      next: () => {},
      complete: () => {
        LoaderService.hide();
        this.router.navigate(['/product']);
      },
    });
  }

  /**

Handles the edit button click event.
@method
*/
  public onEdit(): void {
    this.addProducts.patchValue({
      id: this.addProducts.value.id,
      name: this.addProducts.value.name,
      description: this.addProducts.value.description,
      numberGroup: {
        quantity: this.addProducts.value.numberGroup.quantity,
        price: this.addProducts.value.numberGroup.price,
      },
      total: this.addProducts.value.total,
    });
    this.service.updateItem(this.addProducts.value);
    this.router.navigate(['/product']);
  }
}
