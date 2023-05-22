import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './view/register/register.component';
import { LoginComponent } from './view/login/login.component';
import { HomeComponent } from './view/home/home.component';
import { UserlistComponent } from './view/userlist/userlist.component';
import { NavbarComponent } from './view/navbar/navbar.component';
import { ProductsComponent } from './view/products/products.component';
import { AddItemsComponent } from './view/add-items/add-items.component';
import { SellItemsComponent } from './view/sell-items/sell-items.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserlistComponent,
    NavbarComponent,
    ProductsComponent,
    AddItemsComponent,
    SellItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
