import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserEdit, Users } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  constructor(private http: HttpClient) { }

  api: string = "http://localhost:3000";

  getUsers(): Observable<Users | void> {
    return this.http.get<Users>(`${this.api}/users`);
  }

  deleteUser(id:number) {
    return this.http.delete(`${this.api}/users/${id}`);
  }

  createUser(data: UserEdit) {
    return this.http.post(`${this.api}/users`, data);
  }

}
