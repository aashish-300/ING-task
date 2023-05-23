import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, from, of } from 'rxjs';
import { RegisterModel } from 'src/app/model/Authenticationmodel'

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  private apiUrl = 'http://localhost:5000/user';
  // private apiUrl = 'https://misty-ox-sweater.cyclic.app/user';
  //
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadAllUser();
  }

  userlist: RegisterModel[] = [];
  user!: RegisterModel;
  temp: any;
  index: number = 0;
  role!: string | undefined;

  updateLocalStorage() {
    localStorage.setItem('userlist', JSON.stringify(this.userlist));
  }

  loadAllUser() {
    if (localStorage.getItem('userlist')) {
      this.temp = localStorage.getItem('userlist');
      this.userlist = JSON.parse(this.temp);
      console.log(this.userlist);
    }
  }

  getAllUser(): Observable<RegisterModel[]> {
    this.loadAllUser();
    console.log('all user list loaded');
    console.log(this.userlist);
    return of(this.userlist).pipe(delay(1000));
  }

  getUserById(id: string) {
    console.log('getUserById', this.userlist)
    this.userlist.filter((x: RegisterModel) => {
      console.log(x)
      if (x.id === id) {
        this.user = x
        console.log(this.user);
        return;
      }
    })
    return of(this.user).pipe(delay(1000));
  }

  userRegister(id: string, data: RegisterModel) {
    this.userlist.push(data);
    this.temp = JSON.stringify(this.userlist);
    return localStorage.setItem('userlist', this.temp);
  }

  updataUser(id: string, data: RegisterModel): void {
    console.log('here is update', data);
    Array.from(this.userlist).forEach((e: any, i) => {
      if (e.id === id) {
        this.userlist[i] = data;
        this.updateLocalStorage();
      }
    });
  }

  deleteUser(id: string) {
    this.temp = this.userlist.filter((e: any) => {
      return e.id !== id;
    })
    console.log(this.temp);
    this.userlist = this.temp;
    this.updateLocalStorage();
  }

  isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }
  getUserRole(): Observable<string | undefined> {
    this.role = sessionStorage.getItem('role') !== null ? sessionStorage.getItem('role')?.toString() : ''
    return of(this.role);
  }

}
