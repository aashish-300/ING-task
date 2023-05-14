import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  constructor(private router: Router, private service: AuthService) { 
    this.loadUser();
  }

  ngOnInit(): void {
      
  }

  userlist: any;
  popupmenu = false;
  singleuser: any;

  registerForm = new FormGroup({
    id : new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    isActive: new FormControl(false),
    role: new FormControl('')
  }) 


  loadUser() {
    this.service.getAllUser().subscribe(user => {
      this.userlist = user;
      console.log(this.userlist);
    })
  }

  onUpdate(user: any) {
    console.log(user);
    this.singleuser = user;
    this.popupmenu = true;
    this.registerForm.patchValue({
      id:this.singleuser.id,
      name: this.singleuser.username,
      email: this.singleuser.email,
      password: this.singleuser.password
    });
  }

  updateUser(){
    this.popupmenu = false;
    this.registerForm.patchValue({
      isActive:this.registerForm.value.isActive,
      role: this.registerForm.value.role
    })
    console.log(this.registerForm.value)
    this.service.updataUser(this.registerForm.value.id, this.registerForm.value).subscribe(res => {
      console.log('inside service');
      console.log(res);
      this.loadUser();
    });
    console.log('update')
  }

  closepop(){
    this.popupmenu = false;
    this.loadUser();
  }

}
