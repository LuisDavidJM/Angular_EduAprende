import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-subir-contenido',
  templateUrl: './subir-contenido.component.html',
  styleUrls: ['./subir-contenido.component.css']
})
export class SubirContenidoComponent implements OnInit{
 
  constructor(private authService: LoginService, private router: Router) {}
  
  ngOnInit(): void {
    //Se verifica si el ususario esta logueado para que no pueda ingresar a la url de home
    this.authService.isLogged.subscribe(isLogged => {
      if(!isLogged) {
        this.router.navigateByUrl('/login');
      }
    })
  }
}
