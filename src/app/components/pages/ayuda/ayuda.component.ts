import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit{

  constructor(private router: Router, private loginService: LoginService, private content: ContentService) {}

  response: any;
  selectedHelp!: any; 
  
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
        this.selectedHelp = this.response[0];
      }
    });
    
  }

  returnHelp(): any{
    return this.response;
  }

  onSelectedHelp(help: any) {
    
    this.selectedHelp = help;
  }
}
