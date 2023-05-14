import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { AuthService } from 'src/app/service/auth.service';
import { Validation } from 'src/app/validation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    id : new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    isActive: new FormControl(false),
    role: new FormControl('')
  }) 



  constructor(private _formBuilder: FormBuilder, private service: AuthService, private router: Router) { }

  proceedRegistration() {
    if (this.registerForm.valid) {

      this.service.userRegister(this.registerForm.value).subscribe(res => {
        console.log(res);
        this.router.navigate(['login']);
      })
    }else{
      alert('please enter valid data')
    }
    console.log(this.registerForm);
  }


}
