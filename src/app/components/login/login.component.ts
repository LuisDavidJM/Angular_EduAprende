/* Este componente se encarga de manejar el login de la pagina para obtener los valores de username 
 * y password para posetriormente mandarlos al servicio de http para hacer la comunicacion con la API 
 * y acceder a las credenciales o denegar el acceso.
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LoginRequest } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Esta variable se encarga de contener las validaciónes que se van a hacer para el emai y password
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  /*
   * Se importan los servicios para usar el formulario, para poder utilizar el modulo router de Angular
   * y para usar el servicio de http para counicar la API
   */
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) { }

  //Se obtiene el valor del username que se encuentra en el formulario HTML
  get username(): FormControl {
    return this.loginForm.controls.username;
  }

  //Se obtiene el valor del password que se encuentra en el formulario HTML
  get password(): FormControl {
    return this.loginForm.controls.password;
  }

  /*
   * Este metodo se encarga de comunicarse con la API para hacer el login y define
   * lo que hace cuando es correcta la comunicación y los errores que pueden suceder.
   */

  login(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        error: error => {
          alert("Algo salio mal. Intente ingresar nuevamente.");
        },
        complete: () => {
          console.log("Login correcto");
          this.router.navigateByUrl('/home');
        }
      });

    } else {
      this.loginForm.markAllAsTouched();
      console.log("Incorrecto!");
    }
  }
}
