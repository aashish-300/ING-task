import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@progress/kendo-angular-intl';
import { PDFExportComponent } from '@progress/kendo-angular-pdf-export';
import {
  ISellItems,
  IProductSoldCounts,
  Productmodel,
} from 'src/app/common/model/Productmodel';
import { LoaderService } from 'src/app/service/loader.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

/**
Represents the HomeComponent.
@class
*/
export class HomeComponent implements OnInit {
  @ViewChild('pdf') pdf?: PDFExportComponent;
  @ViewChild('pdfContainer') container!: ElementRef<any>;
  productSalesData!: Productmodel;

  /**

Constructs a new HomeComponent.
@constructor
@param {ProductsService} service - The ProductsService instance.
*/

  constructor(private service: ProductsService, private datePipe: DatePipe) {}

  /**

Represents the invoice number.
@type {number|string}
*/
  invoiceno!: number | string;

  /**

Represents the products.
@type {any}
*/
  products: any;

  ProductSoldCounts!: IProductSoldCounts;

  /**

Initializes the component.
@method
*/
  ngOnInit(): void {
    this.getAllSoldProducts();
  }

  /**

Retrieves all sold products.
@method
*/
  getAllSoldProducts() {
    LoaderService.show();
    this.service.getAllSoldProducts().subscribe({
      next: (data: ISellItems[]) => {
        this.products = data;
        this.service.productCount();
        this.productCount(data);
        LoaderService.hide();
      },
    });
  }

  /**

Counts the number of products.
@method
*/
  productCount(data: ISellItems[]) {
    this.productSalesData = new Productmodel(data, this.datePipe, this.service);
  }

  public saveAs(): void {
    this.container.nativeElement.style.display = 'block';
    this.pdf?.saveAs();
    this.container.nativeElement.style.display = 'none';
  }
}
