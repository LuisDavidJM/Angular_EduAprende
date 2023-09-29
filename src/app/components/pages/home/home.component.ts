/*
 * Este componente contiene toda la información de la pagina principal, tato para usuario como docente
 * y va amostrar diferente información dependiendo del rol de usuario.
 */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    //Se verifica si el ususario esta logueado para que no pueda ingresar a la url de home
    this.loginService.isLogged.subscribe(isLogged => {
      if(!isLogged) {
        this.router.navigateByUrl('/login');
      }
    })
  }
}
