import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LoginRequest } from 'src/app/services/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required]],
  })

  constructor(private fb: FormBuilder, private router:Router, private loginService:LoginService) {}

  get email() {
    return this.loginForm.controls.email
  }

  get password() {
    return this.loginForm.controls.password
  }

  login() {
    if(this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: data => {
          console.log(data)
        },
        error: error => {
          alert("Algo salio mal. Intente ingresar nuevamente.")
        },
        complete: () => {
          console.log("Login correcto")
          //this.router.navigateByUrl('/user')
        }
      })
      
    } else {
      this.loginForm.markAllAsTouched()
      console.log("Incorrecto!")
    }
  }
}
