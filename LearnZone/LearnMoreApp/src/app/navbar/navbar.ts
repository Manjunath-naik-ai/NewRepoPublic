import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(private router: Router) { }

  logout(): void {
    // Clear user data from localStorage
    localStorage.removeItem('user');

    // Navigate to login or home page
    this.router.navigate(['/home']);

  }
}
