import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from './login';
import { LoginRequest } from './loginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(credentials:LoginRequest):Observable<User> {
    return this.http.get<User>('/assets/users.json').pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.log("Hay un error", error.error)
    } else {
      console.error("El estado retornado es", error.status, error.error)
    }
    return throwError(() => new Error("Algo salio mal. Intente ingresar nuevamente."))
  }
}
