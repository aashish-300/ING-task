import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, from, of } from 'rxjs';
import { RegisterModel, loginModel } from 'src/app/common/model/Authenticationmodel'


/**
 * Service responsible for handling authentication-related operations.
 *
 * @remarks
 * This service provides methods for user registration, user management, and authentication status.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  /**
 * Constructs an instance of the AuthService.
 *
 * @param http - The HttpClient for making HTTP requests.
 */
  constructor(private http: HttpClient) {
  }

  /**
  * Lifecycle hook that is called after the service is instantiated.
  * Loads all users from local storage.
  */
  ngOnInit(): void {
    this.loadAllUser();
  }

  /**
   * Array containing all registered users.
   */
  userlist: RegisterModel[] = [];
  /**
  * Represents a single user.
  */
  user!: RegisterModel;
  /**
   * Temporary variable for storing data.
   */
  temp: any;
  /**
   * Index for iteration purposes.
   */
  index: number = 0;
  /**
  * Represents the user's role.
  */
  role!: string | undefined;



  /**
    * Updates the userlist in local storage.
    */
  updateLocalStorage(): void {
    localStorage.setItem('userlist', JSON.stringify(this.userlist));
  }

  /**
  * Loads all users from local storage.
  */
  loadAllUser(): void {
    if (localStorage.getItem('userlist')) {
      this.temp = localStorage.getItem('userlist');
      this.userlist = JSON.parse(this.temp);
    }
  }

  /**
   * Retrieves all users.
   *
   * @returns An Observable that emits an array of RegisterModel objects representing the users.
   */
  getAllUser(): Observable<RegisterModel[]> {
    this.loadAllUser();
    return ob<RegisterModel[]>(this.userlist);
  }

  /**
  * Retrieves a user by their ID.
  *
  * @param id - The ID of the user.
  * @returns An Observable that emits a RegisterModel object representing the user.
  */
  getUserById(id: string): Observable<RegisterModel> {
    this.userlist.filter((x: RegisterModel) => {
      if (x.id === id) {
        this.user = x
        return;
      }
    })
    return ob<RegisterModel>(this.user);
  }

  /**
   * Registers a new user.
   *
   * @param id - The ID of the user.
   * @param data - The data of the user to be registered.
   * @returns An Observable that emits an array of RegisterModel objects representing the updated userlist.
   */
  userRegister(id: string, data: RegisterModel): Observable<RegisterModel[]> {
    this.userlist.push(data);
    this.updateLocalStorage();
    return ob<RegisterModel[]>(this.userlist);
  }

  /**
 * Updates an existing user.
 *
 * @param id - The ID of the user to be updated.
 * @param data - The updated data of the user.
 * @returns An Observable that emits an array of RegisterModel objects representing the updated userlist.
 */
  updataUser(id: string, data: RegisterModel): Observable<RegisterModel[]> {
    this.userlist.forEach((e: RegisterModel, i) => {
      if (e.id === id) {
        this.userlist[i] = data;
        this.updateLocalStorage();
      }
    });
    return ob<RegisterModel[]>(this.userlist);
  }

  /**
 * Deletes a user.
 *
 * @param id - The ID of the user to be deleted.
 * @returns An Observable that emits an array of RegisterModel objects representing the updated userlist.
 */
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
  const startTime = 500;
  const endTime = 2500;
  return Math.random() * ((endTime - startTime) + startTime);
}