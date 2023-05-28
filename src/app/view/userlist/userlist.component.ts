import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { RegisterModel } from 'src/app/common/model/Authenticationmodel';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})

/**

Represents the UserlistComponent.
@class
*/
export class UserlistComponent implements OnInit {
  /**

Represents the register form group.
@type {FormGroup}
*/
  registerForm!: FormGroup;

  /**

Constructs a new UserlistComponent.
@constructor
@param {FormBuilder} _formBuilder - The FormBuilder instance.
@param {Router} router - The Router instance.
@param {AuthService} service - The AuthService instance.
*/
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private service: AuthService
  ) {
    this.registerForm = this._formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      isActive: new FormControl(false),
      role: new FormControl(''),
    });
  }

  /**

Initializes the component.
@method
*/
  ngOnInit(): void {
    this.loadUser();
  }

  /**

Represents the list of users.
@type {RegisterModel[]}
*/
  userlist!: RegisterModel[];
  /**

Represents the status of the popup menu.
@type {boolean}
*/
  popupmenu: boolean = false;
  /**

Represents a single user.
@type {RegisterModel}
*/
  singleuser!: RegisterModel;

  /**
  
  Loads the user data.
  @method
  */
  loadUser() {
    LoaderService.get();
    console.log(LoaderService.show());
    this.service.getAllUser().subscribe({
      next: (data: RegisterModel[]) => {
        this.userlist = data;
      },
      complete: () => {
        console.log('register', LoaderService.get());
        LoaderService.hide();
      },
    });
  }

  /**

Updates the form with the selected user's data.
@param {RegisterModel} user - The selected user.
@method
*/
  onUpdate(user: RegisterModel) {
    this.singleuser = user;
    this.popupmenu = true;
    this.registerForm.patchValue({
      id: this.singleuser.id,
      name: this.singleuser.name,
      email: this.singleuser.email,
      password: this.singleuser.password,
      isActive: this.singleuser.isActive,
      role: this.singleuser.role,
    });
  }

  /**

Deletes a user.
@param {RegisterModel} user - The user to be deleted.
@method
*/
  onDelete(user: RegisterModel) {
    LoaderService.show();
    this.service.deleteUser(user.id).subscribe({
      next: () => {},
      complete: () => {
        LoaderService.hide();
        this.loadUser();
      },
    });
  }

  /**
  
  Updates a user's information.
  @method
  */
  updateUser() {
    LoaderService.show();
    this.popupmenu = false;
    this.registerForm.patchValue({
      id: this.registerForm.value.id,
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      isActive: this.registerForm.value.isActive,
      role: this.registerForm.value.role,
    });
    this.service
      .updataUser(this.registerForm.value.id, this.registerForm.value)
      .subscribe({
        next: () => {},
        complete: () => {
          LoaderService.hide();
          this.loadUser();
        },
      });
  }

  /**

Closes the popup menu.
@method
*/
  closepop() {
    this.popupmenu = false;
    this.loadUser();
  }
}
