import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ProductsService } from 'src/app/service/products.service';
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

/**

Represents the NavbarComponent.
@class
*/
export class NavbarComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor(
    public authservice: AuthService,
    public productservice: ProductsService
  ) {}

  /**

Represents the user's role.
@type {string}
*/
  role!: string;

  /**

Initializes the component.
@method
*/
  ngOnInit(): void {
    this.authservice.getUserRole()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
      next: (data: any) => {
        this.role = data;
      },
    });
  }

  /**
   * Function to handle the event when the product is clicked.
   * It calls the productService to get all products and reloads the page after receiving the response.
   * @returns {void}
   */
  onProduct(): void {
    this.productservice.getAllProducts().subscribe({
      /**
       * Callback function to handle the next value received from the observable.
       * It reloads the page by calling `window.location.reload()` after receiving the data.
       * @returns {void}
       */
      next: (): void => {

        // window.location.reload();
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
