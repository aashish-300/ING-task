import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import {
  RegisterModel,
  loginModel,
  LoginModel,
} from 'src/app/common/model/Authenticationmodel';
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
export class LoginComponent {
  loginData!: LoginModel;
  /**

Represents the login form group.
@type {FormGroup}
*/
  loginForm!: FormGroup;

  /**
   


Constructs a new LoginComponent.
@constructor
@param {FormBuilder} _formBuilder - The FormBuilder instance.
@param {AuthService} service - The AuthService instance.
@param {Router} router - The Router instance.
*/
  constructor(
    private _formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    sessionStorage.clear();
    this.service.loadAllUser();
  }

  /**

Represents the login information.
@type {RegisterModel}
*/
  loginInfo!: RegisterModel;

  /**

Proceeds with the login process.
@method
*/
  proceedLogin() {
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
