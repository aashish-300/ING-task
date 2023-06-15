import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {PDFExportComponent} from '@progress/kendo-angular-pdf-export';
import {ISellItems, Productmodel,} from '../../model';
import {LoaderService, ProductsService} from '../../service';
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

/**
 Represents the HomeComponent.
 @class
 */
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('pdf') pdf?: PDFExportComponent;
  @ViewChild('pdfContainer') container!: ElementRef<any>;
  public productSalesData!: Productmodel;

  private unsubscribe$ = new Subject<void>();

  constructor(private service: ProductsService, private datePipe: DatePipe) {
  }


  ngOnInit(): void {
    this.getAllSoldProducts();
  }

  /**

   Retrieves all sold products.
   @method
   */
  private getAllSoldProducts(): void {
    LoaderService.show();
    this.service.getAllSoldProducts().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data: ISellItems[]) => {
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
    this.productSalesData = new Productmodel(data, this.datePipe);
  }

  public saveAs(): void {
    this.container.nativeElement.style.display = 'block';
    this.pdf?.saveAs();
    this.container.nativeElement.style.display = 'none';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
