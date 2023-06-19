import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, ProductsService} from '../../../service';
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
  public role!: string;

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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
