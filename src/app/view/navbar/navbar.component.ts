import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public service: AuthService) { }

  role!: string;

  ngOnInit(): void {
    this.service.getUserRole().subscribe(
      {
        next: (data: any) => {
          this.role = data;
        }
      }
    )
  }

}
