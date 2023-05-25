import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, from, of } from 'rxjs';
import { RegisterModel, loginModel } from 'src/app/model/Authenticationmodel'

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




  updateLocalStorage(): void {
    localStorage.setItem('userlist', JSON.stringify(this.userlist));
  }

  loadAllUser(): void {
    if (localStorage.getItem('userlist')) {
      this.temp = localStorage.getItem('userlist');
      this.userlist = JSON.parse(this.temp);
    }
  }

  getAllUser(): Observable<RegisterModel[]> {
    this.loadAllUser();
    console.log('all user list loaded');
    console.log(this.userlist);
    return ob<RegisterModel[]>(this.userlist);
  }

  getUserById(id: string): Observable<RegisterModel> {
    this.userlist.filter((x: RegisterModel) => {
      if (x.id === id) {
        this.user = x
        return;
      }
    })
    return ob<RegisterModel>(this.user);
  }

  userRegister(id: string, data: RegisterModel): Observable<RegisterModel[]> {
    this.userlist.push(data);
    this.updateLocalStorage();
    return ob<RegisterModel[]>(this.userlist);
  }

  updataUser(id: string, data: RegisterModel): Observable<RegisterModel[]> {
    this.userlist.forEach((e: RegisterModel, i) => {
      if (e.id === id) {
        this.userlist[i] = data;
        this.updateLocalStorage();
      }
    });
    return ob<RegisterModel[]>(this.userlist);
  }

  deleteUser(id: string): Observable<RegisterModel[]> {
    this.temp = this.userlist.filter((e: RegisterModel) => {
      return e.id !== id;
    })
    this.userlist = this.temp;
    this.updateLocalStorage();
    return ob<RegisterModel[]>(this.userlist);
  }

  isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }
  getUserRole(): Observable<string | undefined> {
    this.role = sessionStorage.getItem('role') !== null ? sessionStorage.getItem('role')?.toString() : ''
    return of(this.role);
  }

}


export function ob<T = any>(ob: T) {
  return of(ob).pipe(delay(delayNumber()))
}

export function delayNumber(): number {
  const startTime = 2500;
  const endTime = 5000;
  return Math.random() * ((endTime - startTime) + startTime);
}