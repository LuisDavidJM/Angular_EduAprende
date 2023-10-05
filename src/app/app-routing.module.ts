import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AyudaComponent } from './components/pages/ayuda/ayuda.component';
import { SubirContenidoComponent } from './components/pages/subir-contenido/subir-contenido.component';
import { GestionDeUsuariosComponent } from './components/pages/gestion-de-usuarios/gestion-de-usuarios.component';

const routes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: "full"},
  { path: "login", component: LoginComponent, pathMatch: "full"},
  { path: "home", component: HomeComponent, pathMatch: "full"},
  { path: "ayuda", component: AyudaComponent, pathMatch: "full"},
  { path: "subir-contenido", component: SubirContenidoComponent, pathMatch: "full"},
  { path: "gestion-de-usuarios", component: GestionDeUsuariosComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
