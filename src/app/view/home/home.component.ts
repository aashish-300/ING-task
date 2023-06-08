import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
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

  public ProductSoldCounts!: IProductSoldCounts;

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
  private getAllSoldProducts(): void {
    LoaderService.show();
    this.service.getAllSoldProducts().subscribe({
      next: (data: ISellItems[]) => {
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
  private productCount(data: ISellItems[]): void {
    this.productSalesData = new Productmodel(data, this.datePipe, this.service);
  }

  public saveAs(): void {
    this.container.nativeElement.style.display = 'block';
    this.pdf?.saveAs();
    this.container.nativeElement.style.display = 'none';
  }
}
