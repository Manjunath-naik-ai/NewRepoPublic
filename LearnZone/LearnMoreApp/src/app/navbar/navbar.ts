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
    sessionStorage.removeItem('user');
    // Redirect to the login page
    this.router.navigate(['/welcome']);
    alert("You have been logged out successfully."); 

  }
  getUserDetails(): { name: string; email: string; role: string } | null {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log(user);
        return {
          name: user.name || '',
          email: user.email || '',
          role: user.role || '',
        };
      } catch (e) {
        console.error('Error parsing user from sessionStorage:', e);
      }
    }
    return null;
  }
  showProfile = false;
  userDetails: { name: string; email: string; role: string } | null = null;

  toggleProfile(): void {
    this.showProfile = !this.showProfile;
    if (this.showProfile) {
      this.userDetails = this.getUserDetails();
    }
  }


}
