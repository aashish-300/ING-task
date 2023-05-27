import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authservice: AuthService, public productservice: ProductsService) { }

  role!: string;

  ngOnInit(): void {
    this.authservice.getUserRole().subscribe(
      {
        next: (data: any) => {
          this.role = data;
        }
      }
    )
  }

  // productClick() {
  //   console.log('productClick');
  //   this.productservice.getAllProducts().subscribe(
  //     {
  //       next: (data: any) => {
  //         console.log(data)
  //       }
  //     }
  //   )
  // }

}
