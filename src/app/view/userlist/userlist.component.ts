import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { Observable } from 'rxjs';
import { RegisterModel } from 'src/app/model/Authenticationmodel';

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
    this.service.getAllUser().subscribe(
      {
        next: (data: RegisterModel[]) => {
          this.userlist = data;
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
    this.service.deleteUser(user.id);
    this.loadUser();
  }

  updateUser() {
    this.popupmenu = false;
    this.registerForm.patchValue({
      id: this.registerForm.value.id,
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      isActive: this.registerForm.value.isActive,
      role: this.registerForm.value.role
    })
    this.service.updataUser(this.registerForm.value.id, this.registerForm.value);
  }

  closepop() {
    this.popupmenu = false;
    this.loadUser();
  }



}
