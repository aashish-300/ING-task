import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { AuthService } from 'src/app/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _formBuilder: FormBuilder,private service: AuthService,private router: Router){}

  registerForm = this._formBuilder.group({
    id: this._formBuilder.control('',Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this._formBuilder.control('',Validators.required),
    email: this._formBuilder.control('',Validators.compose([Validators.required, Validators.email])),
    role: this._formBuilder.control(''),
    password: this._formBuilder.control('',Validators.required),
    isactive: this._formBuilder.control(false),
  })

  proceedRegistration(){
    if(this.registerForm){
      this.service.userRegister(this.registerForm).subscribe(val => {
        console.log(val);
        this.router.navigate(['login']);
        
      })
    }
  }


}
