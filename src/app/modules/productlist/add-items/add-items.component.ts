import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TotalCalulationModel,} from '../../../model';
import {LoaderService, ProductsService} from '../../../service';
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'],
})

/**

 Represents the AddItemsComponent.
 @class
 */
export class AddItemsComponent implements OnInit, OnDestroy {
  /**

   Represents the add products form group.
   @type {FormGroup}
   */

  public addProducts!: FormGroup;
  public edit: boolean = false;
  private unsubscribe$ = new Subject<void>();

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
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  /**

   Initializes the component.
   @method
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    let item;
    if (id) {
      item = this.service.getProductById(id)
    }
    console.log('item', item)
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
    if (id) {
      this.edit = true;
      this.loadData(item);
    } else {
      this.edit = false;
    }
    this.addProducts.get('numberGroup')?.valueChanges.subscribe((val) => {
      this.addProducts
        .get('total')!
        .patchValue(new TotalCalulationModel(val).sum);
    });
  }


  /**

   Loads data for editing.
   @method
   */
  private loadData(item: any): void {
    console.log(item)
    this.addProducts.patchValue({
      id: item.id,
      name: item.name,
      description: item.description,
      numberGroup: {
        quantity: item.numberGroup.quantity,
        price: item.numberGroup.price,
      },
      total: item.total,
    });
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
    this.service.addItems(this.addProducts.value).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: () => {
      },
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
