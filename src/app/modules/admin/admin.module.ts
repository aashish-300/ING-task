import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {UserlistComponent} from "./userlist/userlist.component";
import {PDFExportModule} from "@progress/kendo-angular-pdf-export";
import {AdminComponent} from "./admin.component";


@NgModule({
  declarations: [
    AdminComponent,
    UserlistComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    PDFExportModule,
  ],
})
export class AdminModule {}
