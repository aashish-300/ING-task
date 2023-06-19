import {Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import {RegisterModel} from '../model';
import {obs} from "./products.service";

/**
 * Service responsible for handling authentication-related operations.
 *
 * @remarks
 * This service provides methods for user registration, user management, and authentication status.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
  }


  private user!: RegisterModel;


  private updateLocalStorage(userlist: RegisterModel): void {
    localStorage.setItem('userlist', JSON.stringify(userlist));
  }

  /**
   * Retrieves all users.
   *
   * @returns An Observable that emits an array of RegisterModel objects representing the users.
   */
  public getAllUser(): Observable<RegisterModel[]> {
    let users = localUser('userlist');
    if (!users) return obs<RegisterModel[]>([]);
    return ob<RegisterModel[]>(users);
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param id - The ID of the user.
   * @returns An Observable that emits a RegisterModel object representing the user.
   */
  public getUserById(id: string): Observable<RegisterModel> {
    let user = localUser('userlist');
    if (!user) return obs<RegisterModel>(user);
    user.find((x: RegisterModel) => {
      if (x.id === id) {
        sessionStorage.setItem('user', JSON.stringify(x));
        user = x;
        return;
      }
    });
    return ob<RegisterModel>(user);
  }

  /**
   * Registers a new user.
   *
   * @param data - The data of the user to be registered.
   * @returns An Observable that emits an array of RegisterModel objects representing the updated userlist.
   */
  public userRegister(data: RegisterModel): Observable<RegisterModel[]> {
    let userlist = localUser('userlist');
    userlist.push(data);
    this.updateLocalStorage(userlist);
    return ob<RegisterModel[]>(userlist);
  }

  /**
   * Updates an existing user.
   *
   * @param id - The ID of the user to be updated.
   * @param data - The updated data of the user.
   * @returns An Observable that emits an array of RegisterModel objects representing the updated userlist.
   */
  public updataUser(id: string, data: RegisterModel): Observable<RegisterModel[]> {
    let userlist = localUser('userlist');
    userlist.forEach((e: RegisterModel, i: number) => {
      if (e.id === id) {
        userlist[i] = data;
        this.updateLocalStorage(userlist);
      }
    });
    return ob<RegisterModel[]>(userlist);
  }

  /**
   * Deletes a user.
   *
   * @param id - The ID of the user to be deleted.
   * @returns An Observable that emits an array of RegisterModel objects representing the updated userlist.
   */
  public deleteUser(id: string): Observable<RegisterModel[]> {
    let userlist = localUser('userlist');
    userlist = userlist.filter((e: RegisterModel) => {
      return e.id !== id;
    });
    this.updateLocalStorage(userlist);
    return ob<RegisterModel[]>(userlist);
  }

  public isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }

  public getUserRole(): Observable<string | undefined> {
    let role = sessionStorage.getItem('role');
    role = role !== null ? role.toString() : '';
    return of(role);
  }
}

export function localUser(key: string) {
  let items;
  if (localStorage.getItem(key)) {
    items = localStorage.getItem(key);
    if (!items) return;
    items = JSON.parse(items!);
  }
  return items;
}

export function ob<T = any>(ob: T) {
  return of(ob).pipe(delay(delayNumbers()));
}

export function delayNumbers(): number {
  const startTime = 500;
  const endTime = 2500;
  return Math.random() * (endTime - startTime + startTime);
}
