import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, } from '@angular/forms'
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';


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

  loginInfo: any;

  proceedLogin() {
    this.loginInfo = this.service.getUserById(this.loginForm.value.username);
    console.log(this.loginInfo);
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
  // this.loginInfo = JSON.parse(this.loginInfo);
  // if (this.loginInfo.password === this.loginForm.value.password) {
  //   if (this.loginInfo.isActive) {
  //     sessionStorage.setItem('username', this.loginInfo.id);
  //     sessionStorage.setItem('role', this.loginInfo.role);
  //     this.router.navigate(['']);
  //   } else {
  //     alert('Please contact admin to activate');
  //   }
  // } else {
  //   alert('invalid credentials')
  // }
  // this.service.getUserById(this.loginForm.value.username).subscribe(res => {
  //   console.log(res);
  //   this.userData = res;

  //   if(this.userData.password === this.loginForm.value.password) {
  //     if(this.userData.isActive){
  //       sessionStorage.setItem('username',this.userData.id);
  //       sessionStorage.setItem('role',this.userData.role);
  //       this.router.navigate(['']);
  //     }else{
  //       alert('Please contact admin to activate');
  //     }
  //   }else{
  //     alert('invalid credentials')
  //   }

  // })
  // }



}
