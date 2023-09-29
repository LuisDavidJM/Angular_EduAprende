/* Este componente soalmente contiene el contenido del header de la pagina, el cual solo incluye
 * el boton de logout y el rol de usuario
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: LoginService, private router: Router) {}

  //Metodo para mandar a llamar a logout cuando se presiona el botón
  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  //metodo para obtener el rol de usuario guardado en localStorage
  get userRole(): string | null {
    return localStorage.getItem('role');
  }
}
