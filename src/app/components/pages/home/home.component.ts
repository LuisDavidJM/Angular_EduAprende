/*
 * Este componente contiene toda la información de la pagina principal, tato para usuario como docente
 * y va amostrar diferente información dependiendo del rol de usuario.
 */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Content } from 'src/app/interfaces/data.interface';
import { ContentService } from 'src/app/services/content.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private router: Router, private loginService: LoginService, private content: ContentService) {}

  response: any;
  selectedTitle!: any; 
  
  ngOnInit(): void {
    //Se verifica si el ususario esta logueado para que no pueda ingresar a la url de home
    this.loginService.isLogged.subscribe(isLogged => {
      if(!isLogged) {
        this.router.navigateByUrl('/login');
      }
    });
    this.content.infoContent().subscribe({
      next: resp => {
        this.response = resp;
      },
      complete: () => {
        this.selectedTitle = this.response[0];
      }
    });
    
  }

  returnRole(): string | null {
    return localStorage.getItem('role');
  }

  returnTitles(): any{
    return this.response;
  }

  onSelectedTitle(title: any) {

    let classTitle = document.getElementById("selected-title");
    if(classTitle)
    classTitle.className = "selected";
    this.selectedTitle = title;
  }


}
