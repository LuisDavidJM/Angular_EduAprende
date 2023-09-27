import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from './login';
import { LoginRequest } from './loginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  api: string = "http://localhost:3000";  

  login(credentials:LoginRequest):Observable<User | void> {
    return this.http.post<User>(`${this.api}/auth/login`, credentials).pipe(
      map((response: User) => {
        //console.log("Res->", response)
        this.saveToken(response.token)
      }),
      catchError(error => this.handleError(error))
    )
  }
  logout() { 
    localStorage.removeItem('token');
    // set userIsLoggued = false
  }
  private readToken() {

  }
  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if(error.status === 0) {
      console.log("Hay un error", error.error)
    } else {
      console.error("El estado retornado es", error.status, error.error)
    }
    return throwError(() => new Error("Algo salio mal. Intente ingresar nuevamente."))
  }
}
