import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellItemsComponent } from 'src/app/view/sell-items/sell-items.component';

const routes: Routes = [
  { path: 'sellItems', component: SellItemsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellItemsRoutingModule { }
