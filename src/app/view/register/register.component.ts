import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {AuthService} from 'src/app/service/auth.service';
import {Router} from '@angular/router';
import {LoaderService} from 'src/app/service/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  public registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
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
    if(this.registerForm.invalid) {
      alert('please enter valid data');
      return;
    }
    LoaderService.show();
    this.service
      .userRegister(this.registerForm.getRawValue())
      .subscribe({
        next: (data: any) => {},
        complete: () => {
          LoaderService.hide();
          this.router.navigate(['login']);
        },
      });

  }
}
