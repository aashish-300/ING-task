import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LoginModel,
  RegisterModel,
} from 'src/app/common/model/Authenticationmodel';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

/**

Represents the LoginComponent.
@class
*/
export class LoginComponent implements OnInit {
  private loginData!: LoginModel;
  /**

Represents the login form group.
@type {FormGroup}
*/
  public loginForm!: FormGroup;

  /**
   

Constructs a new LoginComponent.
@constructor
@param {FormBuilder} _formBuilder - The FormBuilder instance.
@param {AuthService} service - The AuthService instance.
@param {Router} router - The Router instance.
*/
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    sessionStorage.clear();
    this.service.loadAllUser();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    const adminAccess = {
      id: 'admin',
      name: 'admin',
      password: 'admin',
      email: 'admin@gmail.com',
      isActive: true,
      role: 'admin',
    };

    const local = localStorage.getItem('userlist');
    if (local !== null) {
      let data = JSON.parse(local);
      data = data.filter((e: { id: string }) => {
        return e.id !== 'admin';
      });
      data.push(adminAccess);
      localStorage.setItem('userlist', JSON.stringify(data));
    }
  }

  /**
   
  Represents the login information.
@type {RegisterModel}
*/
  public loginInfo!: RegisterModel;

  /**

Proceeds with the login process.
@method
*/
  public proceedLogin() {
    LoaderService.show();
    this.service.getUserById(this.loginForm.value.username).subscribe({
      next: (data: RegisterModel) => {
        this.loginData = new LoginModel(
          this.loginForm.value.password,
          data,
          this.router
        );
      },
      complete: () => {
        LoaderService.hide();
      },
    });
  }
}
