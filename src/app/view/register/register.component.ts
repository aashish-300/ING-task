import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { AuthService } from 'src/app/service/auth.service';
import { Validation } from 'src/app/validation';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/model/registerModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private service: AuthService, private router: Router) {
    this.service.loadAllUser();
    this.registerForm = this._formBuilder.group({
      id: ['admin', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      isActive: [true],
      role: ['admin']
    })
  }


  proceedRegistration() {
    if (this.registerForm.valid) {
      this.service.userRegister(this.registerForm.value.id, this.registerForm.value);
      // this.service.userRegister(this.registerForm.value).subscribe(res => {
      //   console.log('here is registration')
      //   console.log(res);
      // })
      this.router.navigate(['login']);
    } else {
      alert('please enter valid data')
    }
    // console.log(this.registerForm);
  }


}
