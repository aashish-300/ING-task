import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

/**

Represents the NavbarComponent.
@class
*/
export class NavbarComponent implements OnInit {

  /**

Constructs a new NavbarComponent.
@constructor
@param {AuthService} authservice - The AuthService instance.
@param {ProductsService} productservice - The ProductsService instance.
*/
  constructor(public authservice: AuthService, public productservice: ProductsService) { }

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
    this.authservice.getUserRole().subscribe(
      {
        next: (data: any) => {
          this.role = data;
        }
      }
    )
  }
}
