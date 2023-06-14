import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RegisterModel } from 'src/app/model/Authenticationmodel';
import { AuthService } from 'src/app/service/auth.service';
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
  public registerForm!: FormGroup;

  /**

   Constructs a new UserlistComponent.
   @constructor
   @param {FormBuilder} _formBuilder - The FormBuilder instance.
   @param {AuthService} service - The AuthService instance.
   */
  constructor(private formBuilder: FormBuilder, private service: AuthService) {}

  /**

   Initializes the component.
   @method
   */
  ngOnInit(): void {
    this.loadUser();
    this.registerForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      isActive: new FormControl(false),
      role: new FormControl(''),
    });
  }

  /**

   Represents the list of users.
   @type {RegisterModel[]}
   */
  public userlist!: RegisterModel[];
  /**

   Represents the status of the popup menu.
   @type {boolean}
   */
  public popupmenu: boolean = false;
  /**

   Represents a single user.
   @type {RegisterModel}
   */
  // singleuser!: RegisterModel;

  /**

   Loads the user data.
   @method
   */
  loadUser() {
    LoaderService.show();
    this.service.getAllUser().subscribe({
      next: (data: RegisterModel[]) => {
        this.userlist = data;
      },
      complete: () => {
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
    const updateUser = user;
    this.popupmenu = true;
    this.registerForm.patchValue({
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      password: updateUser.password,
      isActive: updateUser.isActive,
      role: updateUser.role,
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
