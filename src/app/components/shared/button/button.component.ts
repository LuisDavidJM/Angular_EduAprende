/**
 * Este compenente solamente se encarga de configurar el boton principal que va a llevar
 * a diferentes ventanas segun sea el contenido
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  constructor(private router: Router) { }

  textButton(): String{
    const role = localStorage.getItem('role');
    if (role === "docente" && this.router.url === "/home"){
      return "";
    } else if (role === "estudiante" && this.router.url === "/home"){
      return "Necesitas ayuda";
    } else if ((role === "docente" && this.router.url === "/subir-contenido") || (role === "estudiante" && this.router.url === "/ayuda")) {
      return "Menú Principal";
    } else {
      return "Menú Principal";
    }
  }

  nextPage(): void {
    const role = localStorage.getItem('role');
    let urlFollow;
    if (role === "docente" && this.router.url === "/home"){
      urlFollow = 'subir-contenido';
    } else if (role === "estudiante" && this.router.url === "/home"){
      urlFollow = 'ayuda';
    } else if ((role === "docente" && this.router.url === "/subir-contenido") || (role === "estudiante" && this.router.url === "/ayuda")) {
      urlFollow = "home";
    } else {
      urlFollow = 'home';
    }
    this.router.navigateByUrl(`/${urlFollow}`);
  }
}
