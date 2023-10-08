import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/shared/header/header.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ButtonComponent } from './components/shared/button/button.component';
import { SubirContenidoComponent } from './components/pages/subir-contenido/subir-contenido.component';
import { AyudaComponent } from './components/pages/ayuda/ayuda.component';
import { GestionDeUsuariosComponent } from './components/pages/gestion-de-usuarios/gestion-de-usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    NotFoundComponent,
    HomeComponent,
    ButtonComponent,
    SubirContenidoComponent,
    AyudaComponent,
    GestionDeUsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
