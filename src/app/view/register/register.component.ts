import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _formBuilder: FormBuilder){}

  registerForm = this._formBuilder.group({
    id: this._formBuilder.control('',Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this._formBuilder.control('',Validators.required),
    email: this._formBuilder.control('',Validators.compose([Validators.required, Validators.email])),
    role: this._formBuilder.control(''),
    password: this._formBuilder.control('',Validators.required),
    isactive: this._formBuilder.control(false),
  })

}
