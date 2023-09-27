import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { User } from './login';
import { LoginRequest } from './loginRequest';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.readToken();
   }

  api: string = "http://localhost:3000";  

   get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
   }

  login(credentials:LoginRequest):Observable<User | void> {
    return this.http.post<User>(`${this.api}/auth/login`, credentials).pipe(
      map((response: User) => {
        //console.log("Res->", response)
        this.saveToken(response.token)
        this.saveRole(response.role)
        this.loggedIn.next(true);
        return response;
      }),
      catchError(error => this.handleError(error))
    )
  }
  logout() { 
    localStorage.removeItem('token');
    localStorage.removeItem('role')
    this.loggedIn.next(false);
  }
  private readToken() {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    //console.log('isExpired->', isExpired);
    isExpired ? this.logout() : this.loggedIn.next(true);
  }
  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  private saveRole(role: string) {
    localStorage.setItem('role', role);
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
