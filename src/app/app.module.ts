/**
 * @fileoverview Main module that bootstraps the Angular application.
 * @module AppModule
 */

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {NavbarComponent} from './components/common/navbar/navbar.component';
import {LoaderComponent} from './components/common/loader/loader.component';
import {PDFExportModule} from '@progress/kendo-angular-pdf-export';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtractPdfComponent} from "./components/common/extract-pdf/extract-pdf.component";
import {HomeComponent} from "./components/home/home.component";

/**
 * Main module that bootstraps the Angular application.
 */
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    LoaderComponent,
    ExtractPdfComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PDFExportModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
