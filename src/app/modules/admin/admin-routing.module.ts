import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserlistComponent} from "./userlist/userlist.component";
import {HomeComponent} from "../../components/home/home.component";
import {AddItemsComponent} from "../productlist/add-items/add-items.component";
import {SellItemsComponent} from "../productlist/sell-items/sell-items.component";
import {AuthGuard,RoleGuard} from "../../guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserlistComponent,
    canActivate:[AuthGuard,RoleGuard],
    data: {allowedRoles: ['admin']}
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate:[AuthGuard,RoleGuard],
    data: {allowedRoles: ['admin']}
  },
  {
    path: 'addItems',
    component: AddItemsComponent,
    canActivate:[AuthGuard,RoleGuard],
    data: {allowedRoles: ['admin']}
  },
  {
    path: 'sellItems',
    component: SellItemsComponent,
    canActivate:[AuthGuard,RoleGuard],
    data: {allowedRoles: ['admin']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
