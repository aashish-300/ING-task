/**
 * @fileoverview Routing module for the Angular application.
 * @module AppRoutingModule
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';
import { UserlistComponent } from './view/userlist/userlist.component';
import { ProductsComponent } from './view/products/products.component';
import { AuthGuard } from './guard/auth.guard';
import { AddItemsComponent } from './view/add-items/add-items.component';
import { SellItemsComponent } from './view/sell-items/sell-items.component';
import { RoleGuard } from './guard/role.guard';

/**
 * Defines the routes for the application.
 * @type {Routes}
 */
const routes: Routes = [
    /**
     * Default route for the home component.
     * Only accessible to authenticated users with the 'admin' or 'supervisor' roles.
     */
    { path: '', component: HomeComponent, canActivate: [AuthGuard, RoleGuard], data: { allowedRoles: ['admin', 'supervisor'] } },

    /**
     * Route for the login component.
     * Unrestricted access.
     */
    { path: 'login', component: LoginComponent },

    /**
     * Route for the register component.
     * Unrestricted access.
     */
    { path: 'register', component: RegisterComponent },

    /**
     * Route for the user list component.
     * Only accessible to authenticated users with the 'admin' role.
     * Lazy-loaded module: UserModule.
     */
    {
        path: 'user', component: UserlistComponent,
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard, RoleGuard], data: { allowedRoles: ['admin'] }
    },

    /**
     * Route for the products component.
     * Only accessible to authenticated users with the 'admin', 'supervisor', or 'salesperson' roles.
     * Lazy-loaded module: ProductModule.
     */
    {
        path: 'product', component: ProductsComponent,
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
        canActivate: [AuthGuard, RoleGuard], data: { allowedRoles: ['admin', 'supervisor', 'salesperson'] }
    },

    /**
     * Route for the add items component.
     * Only accessible to authenticated users with the 'admin', 'supervisor', or 'salesperson' roles.
     * Lazy-loaded module: AddItemsModule.
     */
    {
        path: 'addItems', component: AddItemsComponent,
        loadChildren: () => import('./modules/add-items/add-items.module').then((m) => m.AddItemsModule),
        canActivate: [AuthGuard, RoleGuard], data: { allowedRoles: ['admin', 'supervisor', 'salesperson'] }
    },

    /**
     * Route for the sell items component.
     * Only accessible to authenticated users with the 'admin' or 'sales person' roles.
     * Lazy-loaded module: SellItemsModule.
     */
    {
        path: 'sellItems', component: SellItemsComponent,
        loadChildren: () => import('./modules/sell-items/sell-items.module').then((m) => m.SellItemsModule),
        canActivate: [AuthGuard, RoleGuard], data: { allowedRoles: ['admin', 'sales person'] }
    }
];

/**
 * Angular module for managing the application routes.
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule { };
