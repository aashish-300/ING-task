import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {AddItemsComponent} from "./add-items/add-items.component";
import {SellItemsComponent} from "./sell-items/sell-items.component";

const routes: Routes = [
  {
    path:'',
    component: ProductsComponent,
    data:{allowedRoles: ['admin','salesperson','supervisor']}
  },
  {
    path: 'addItems/:id',
    component: AddItemsComponent,
    data:{allowedRoles: ['admin','supervisor']}
  },
  {
    path: 'sellItems',
    component: SellItemsComponent,
    data:{allowedRoles: ['admin','salesperson']}
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductlistRoutingModule { }
