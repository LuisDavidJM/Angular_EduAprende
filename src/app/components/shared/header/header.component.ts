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

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }

  get userRole(): string | null {
    return localStorage.getItem('role');
  }
}
