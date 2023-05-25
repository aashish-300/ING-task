import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { Observable } from 'rxjs';
import { RegisterModel } from 'src/app/model/Authenticationmodel';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private router: Router, private service: AuthService) {
    this.registerForm = this._formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      isActive: new FormControl(false),
      role: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.loadUser();

  }

  userlist!: RegisterModel[];
  popupmenu = false;
  singleuser!: RegisterModel;


  loadUser() {
    LoaderService.get();
    console.log(LoaderService.show());
    this.service.getAllUser().subscribe(
      {
        next: (data: RegisterModel[]) => {
          this.userlist = data;
        },
        complete: () => {
          console.log('register', LoaderService.get())
          LoaderService.hide();
        }
      }
    );
  }

  onUpdate(user: RegisterModel) {
    this.singleuser = user;
    this.popupmenu = true;
    this.registerForm.patchValue({
      id: this.singleuser.id,
      name: this.singleuser.name,
      email: this.singleuser.email,
      password: this.singleuser.password,
      isActive: this.singleuser.isActive,
      role: this.singleuser.role
    });
  }

  onDelete(user: RegisterModel) {
    LoaderService.show();
    this.service.deleteUser(user.id).subscribe(
      {
        next: () => { },
        complete: () => {
          LoaderService.hide();
          this.loadUser();
        }
      }
    );
  }

  updateUser() {
    LoaderService.show();
    this.popupmenu = false;
    this.registerForm.patchValue({
      id: this.registerForm.value.id,
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      isActive: this.registerForm.value.isActive,
      role: this.registerForm.value.role
    })
    this.service.updataUser(this.registerForm.value.id, this.registerForm.value).subscribe(
      {
        next: () => { },
        complete: () => {
          LoaderService.hide();
          this.loadUser()
        }
      }
    );
  }

  closepop() {
    this.popupmenu = false;
    this.loadUser();
  }



}
