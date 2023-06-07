/**
 * @fileoverview Main module that bootstraps the Angular application.
 * @module AppModule
 */

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
import { NavbarComponent } from './common/components/navbar/navbar.component';
import { ProductsComponent } from './view/products/products.component';
import { AddItemsComponent } from './view/add-items/add-items.component';
import { SellItemsComponent } from './view/sell-items/sell-items.component';
import { LoaderComponent } from './common/components/loader/loader.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtractPdfComponent } from './common/components/extract-pdf/extract-pdf.component';
import { DatePipe } from '@progress/kendo-angular-intl';
import { LabelModule } from '@progress/kendo-angular-label';


/**
 * Main module that bootstraps the Angular application.
 */
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
    SellItemsComponent,
    LoaderComponent,
    ExtractPdfComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PDFExportModule,
    BrowserAnimationsModule,
    LabelModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
