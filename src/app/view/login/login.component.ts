import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, } from '@angular/forms'
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { RegisterModel, loginModel } from 'src/app/model/Authenticationmodel';
import { LoaderService } from 'src/app/service/loader.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private service: AuthService, private router: Router) {

    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    sessionStorage.clear()
    this.service.loadAllUser();
  }

  loginInfo!: RegisterModel;

  proceedLogin() {
    console.log(LoaderService.get());
    LoaderService.show();
    this.service.getUserById(this.loginForm.value.username).subscribe(
      {
        next: (data: RegisterModel) => {
          this.loginInfo = data;
          if (this.loginInfo.password === this.loginForm.value.password) {
            if (this.loginInfo.isActive) {
              sessionStorage.setItem('username', this.loginInfo.id);
              sessionStorage.setItem('role', this.loginInfo.role);
              // this.router.navigate(['']);
              console.log(this.loginInfo.role);
              if (this.loginInfo.role === 'salesperson') {
                this.router.navigate(['product']);
              } else {
                this.router.navigate(['']);
              }
            } else {
              alert('Please contact admin to activate');
            }
          } else {
            alert('invalid credentials')
          }
        },
        complete: () => {
          console.log('complete', LoaderService.get())
          LoaderService.hide();
          console.log(this.loginInfo.role)
          // if (this.loginInfo.role === 'salesperson') {
          //   this.router.navigate(['/product']);
          // } else {
          //   this.router.navigate(['']);
          // }
          // this.router.navigate(['']);


        }

      }
    );
  }
}
