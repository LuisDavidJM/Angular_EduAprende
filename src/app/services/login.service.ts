/* Este servicio se encarga cargar toda la información de la API para poder ser usada en los diferentes 
 * componentes ademas maneja el guardado de los tokens y el login para saber cuando un usuario
 * se encuentra loggeado
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { User, LoginRequest } from 'src/app/interfaces/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

//Instruccion para saber la expiración del token despues de cierto tiempo
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

  //Metodo para guardar la información si el usuario esta logueado o no
  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  /* Metodo que se encarga de verificar el login con la API y guardar la información que rotorna 
   * la API como token y role
   */
  login(credentials: LoginRequest): Observable<User | void> {
    return this.http.post<User>(`${this.api}/auth/login`, credentials).pipe(
      map((response: User) => {
        //console.log("Res->", response)
        this.saveToken(response.token);
        this.saveRole(response.role);
        this.loggedIn.next(true);
        return response;
      }),
      catchError(error => this.handleError(error))
    );
  }

  //Metodo que se encarga de remover la información del localStorage cuango un usuario hace logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.loggedIn.next(false);
  }

  //Metodo para leer el token en localStorage y saber si sigue logeado el usuario
  private readToken() {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    //console.log('isExpired->', isExpired);
    isExpired ? this.logout() : this.loggedIn.next(true);
  }

  //Metodo para guardar el token el localStorage
  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  //Metodo para guardar el role el localStorage
  private saveRole(role: string) {
    localStorage.setItem('role', role);
  }

  //Metodo para manejar los errores si ocurre algo con la conexion con la API
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      console.log("Hay un error", error.error);
    } else {
      console.error("El estado retornado es", error.status, error.error);
    }
    return throwError(() => new Error("Algo salio mal. Intente ingresar nuevamente."));
  }
}
