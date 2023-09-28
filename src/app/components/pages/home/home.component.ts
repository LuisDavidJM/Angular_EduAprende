import { Component, OnInit } from '@angular/core';
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
    if(localStorage.getItem('role') !== "estudiante" && localStorage.getItem('role') !== "docente") {
      this.router.navigateByUrl('/login')
    }
  }
}
