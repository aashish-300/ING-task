import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductlistRoutingModule } from './productlist-routing.module';
import { ProductlistComponent } from './productlist.component';
import {AddItemsComponent} from "./add-items/add-items.component";
import {SellItemsComponent} from "./sell-items/sell-items.component";
import {ProductsComponent} from "./products/products.component";
import {AdminRoutingModule} from "../admin/admin-routing.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProductlistComponent,
    AddItemsComponent,
    SellItemsComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductlistRoutingModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ProductlistModule { }
