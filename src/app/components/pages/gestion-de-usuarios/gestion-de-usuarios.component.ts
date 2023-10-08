import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { UserEdit } from 'src/app/interfaces/user.interface';
import { LoginService } from 'src/app/services/login.service';
import { ManageUsersService } from 'src/app/services/manage-users.service';

@Component({
  selector: 'app-gestion-de-usuarios',
  templateUrl: './gestion-de-usuarios.component.html',
  styleUrls: ['./gestion-de-usuarios.component.css']
})
export class GestionDeUsuariosComponent implements OnInit{

  constructor(private authService: LoginService, private router: Router, private userService: ManageUsersService) {}
  
  users: any;
  id = 1;
  data ={
    "username": "",
    "password": "",
    "role": ""
  }
  add: boolean = false;
  delete: boolean = false;

  ngOnInit(): void {
    //Se verifica si el ususario esta logueado para que no pueda ingresar a la url de home
    this.authService.isLogged.subscribe(isLogged => {
      if(!isLogged) {
        this.router.navigateByUrl('/login');
      }
    });

    this.userService.getUsers().subscribe(resp => {
      this.users = resp;
    })
  }

  onDeleteUser(id: number){
    this.id = id;
    console.log(this.id);
    this.userService.deleteUser(id).subscribe({
      error: error => {
        alert("No se puede eliminar un ID que no existe, intente de nuevo");
      },
      complete: () =>{
        window.location.reload();
      }
    });
    this.delete = false;
    this.add = false;
    
  }

  onCreateUser(data: UserEdit) {
    this.userService.createUser(data).subscribe();
    this.delete = false;
    this.add = false;
    window.location.reload();
  }

  addUser(): void {
    this.add = true;
    this.delete = false;
  }

  deleteUser(): void {
    this.delete = true;
    this.add = false;
  }

}
