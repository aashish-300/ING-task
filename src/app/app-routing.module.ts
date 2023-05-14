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

const routes: Routes = [
    { path: '', component: HomeComponent,canActivate:[AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user', component: UserlistComponent,canActivate:[AuthGuard] },
    { path: 'product', component: ProductsComponent,canActivate:[AuthGuard] },
    { path: 'addItems', component: AddItemsComponent,canActivate:[AuthGuard] },
    { path: 'sellItems', component: SellItemsComponent,canActivate:[AuthGuard] }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { };


// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
// //  {component:LoginComponent,path:'login'},
// //  {component:RegisterComponent,path:'register'},
// //  {component:HomeComponent,path:'',canActivate:[AuthGuard]},
// //  {component:UserComponent,path:'user',canActivate:[AuthGuard]},
// //  {component:CustomerComponent,path:'customer',canActivate:[AuthGuard]},
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }         