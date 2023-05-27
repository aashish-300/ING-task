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

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard, RoleGuard], data: { allowedRoles: ['admin', 'supervisor'] } },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'user', component: UserlistComponent,
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard, RoleGuard], data: { allowedRoles: ['admin'] }
    },
    {
        path: 'product', component: ProductsComponent,
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
        canActivate: [AuthGuard, RoleGuard], data: { allowedRoles: ['admin', 'supervisor', 'salesperson'] }
    },
    {
        path: 'addItems', component: AddItemsComponent,
        loadChildren: () => import('./modules/add-items/add-items.module').then((m) => m.AddItemsModule),
        canActivate: [AuthGuard, RoleGuard], data: { allowedRoles: ['admin', 'supervisor', 'salesperson'] }
    },
    {
        path: 'sellItems', component: SellItemsComponent,
        loadChildren: () => import('./modules/sell-items/sell-items.module').then((m) => m.SellItemsModule),
        canActivate: [AuthGuard, RoleGuard], data: { allowedRoles: ['admin', 'sales person'] }
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { };
