import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemsComponent } from 'src/app/view/add-items/add-items.component';

const routes: Routes = [
  { path: 'addItems', component: AddItemsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddItemsRoutingModule { }
