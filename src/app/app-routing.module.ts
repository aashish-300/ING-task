/**
 * @fileoverview Routing module for the Angular application.
 * @module AppRoutingModule
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {RoleGuard,AuthGuard} from "./guard";

/**
 * Defines the routes for the application.
 * @type {Routes}
 */
const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch:'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate:[AuthGuard,RoleGuard],
    data: {allowedRoles: ['admin', 'supervisor']}
  },
  {
    path: 'user',
    redirectTo: 'admin/user',
    pathMatch: 'full'
  },
  {
    path: 'product',
    loadChildren: () => import('./modules/productlist/productlist.module').then(m => m.ProductlistModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
];

/**
 * Angular module for managing the application routes.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
