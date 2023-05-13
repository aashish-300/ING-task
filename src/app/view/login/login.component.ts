import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private service: AuthService, private router: Router) {
    sessionStorage.clear()
  }

  userData: any;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })


  proceedLogin() {
    this.service.getUserById(this.loginForm.value.username).subscribe(res => {
      console.log(res);
      this.userData = res;

      if(this.userData.password === this.loginForm.value.password) {
        if(this.userData.isActive){
          sessionStorage.setItem('username',this.userData.id);
          sessionStorage.setItem('role',this.userData.role);
          this.router.navigate(['']);
        }else{
          alert('Please contact admin to activate');
        }
      }else{
        alert('invalid credentials')
      }

    })
  }



}
