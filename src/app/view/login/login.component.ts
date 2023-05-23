import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, } from '@angular/forms'
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/model/Authenticationmodel';


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

    // this.loginInfo;
  }

  loginInfo!: RegisterModel;

  proceedLogin() {
    this.service.getUserById(this.loginForm.value.username).subscribe(
      {
        next: (data: any) => {
          console.log(data);
          this.loginInfo = data;
          console.log('login info', this.loginInfo);
          if (this.loginInfo.password === this.loginForm.value.password) {
            if (this.loginInfo.isActive) {
              sessionStorage.setItem('username', this.loginInfo.id);
              sessionStorage.setItem('role', this.loginInfo.role);
              this.router.navigate(['']);
            } else {
              alert('Please contact admin to activate');
            }
          } else {
            alert('invalid credentials')
          }
        }
      }
    );
  }
}
