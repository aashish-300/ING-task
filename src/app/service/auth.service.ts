import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4200/user';

  constructor(private http: HttpClient) { }

  getAllUser(){
    return this.http.get(this.apiUrl);
  }

  getUserById(id:any){
    return this.http.get(`this.apiUrl/${id}`);
  }

  userRegister(data:any){
    return this.http.post(this.apiUrl,data);
  }

  updataUser(id:any ,data:any){
    return this.http.put(`this.apiUrl/${id}`,data);
  }

}