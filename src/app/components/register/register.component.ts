import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/service/auth.service';
import {Router} from '@angular/router';
import {LoaderService} from 'src/app/service/loader.service';
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit,OnDestroy {
  public registerForm!: FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
  public proceedRegistration() {
    if (this.registerForm.invalid) {
      alert('please enter valid data');
      return;
    }
    LoaderService.show();
    this.service.userRegister(this.registerForm.getRawValue()).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: () => {
      },
      complete: () => {
        LoaderService.hide();
        this.router.navigate(['login']);
      },
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
