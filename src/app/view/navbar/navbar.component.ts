import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public service: AuthService) { }

  role:any;
  access:any;

  ngOnInit(): void {
    this.role = this.service.getUserRole();
  }

}
