import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Validation } from 'src/app/validation';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/common/model/Authenticationmodel';
import { LoaderComponent } from '../../common/components/loader/loader.component';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

/**

Represents the RegisterComponent.
@class
*/
export class RegisterComponent {
  /**

Represents the register form group.
@type {FormGroup}
*/

  registerForm!: FormGroup;

  /**

Constructs a new RegisterComponent.
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
    this.service.loadAllUser();
    this.registerForm = this._formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      isActive: [false],
      role: [''],
    });
  }

  /**
  
  Proceeds with the user registration.
  @method
  */
  proceedRegistration() {
    LoaderService.show();
    if (this.registerForm.valid) {
      this.service
        .userRegister(this.registerForm.value.id, this.registerForm.value)
        .subscribe({
          next: (data: any) => {},
          complete: () => {
            LoaderService.hide();
            this.router.navigate(['login']);
          },
        });
    } else {
      alert('please enter valid data');
    }
  }
}
