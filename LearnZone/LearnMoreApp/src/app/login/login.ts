import { Component,OnInit } from '@angular/core';
import { Lzservice } from '../services/lzservice';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  [x: string]: any;
  errorMessage: string = '';
  constructor(private lzservice: Lzservice, private router: Router) { }

 

  SubmitLogin(form: NgForm): void {
  
    if (form.valid) {
      const { username, password } = form.value;
      this.lzservice.Login(username, password).subscribe({
        next: (user: any) => {
          if (user && user.role) {
            
            console.log('Logged in user:', user);
            localStorage.setItem('user', JSON.stringify(user));
            alert(`Welcome ${user.name}! You are logged in as ${user.role}.`);

            switch (user.role.toLowerCase()) {
              case 'admin':
                this.router.navigate(['/Logindashboard']);

                break;
              case 'instructor':
             
                break;
              case 'user':
                this.router.navigate(['/userdashBoard']);

              
                break;
              default:
              
            }
          } else {
            // ❌ Login failed
            this.errorMessage = 'Invalid username or password';
            alert("Login failed Please try again later");
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage = 'Server error. Please try again later.';
          alert("Login failed Please try again later");
        }
      });
    }
       
  }

  ngOnInit(): void {
  }
}
