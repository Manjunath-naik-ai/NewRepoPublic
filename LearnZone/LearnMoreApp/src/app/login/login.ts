import { Component,OnInit } from '@angular/core';
import { Lzservice } from '../services/lzservice';
import { NgForm} from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  constructor(private lzservice: Lzservice) { }

  SubmitLogin(form: NgForm): void {

    if (form.valid) {
      const { username, password } = form.value;
      this.lzservice.Login(username, password).subscribe({
        next: (response) => {
          // Assuming the response contains user data or a token
          if (response == 1) {
            sessionStorage.setItem('Admin', password);

          }
          else if (response == 0) {
            sessionStorage.setItem('instructor', password);
          }
          else {
            sessionStorage.setItem('user', password);
          }
          alert('Login successful!');
          console.log('Login successful', response);
          // Handle successful login here, e.g., navigate to another page
        },
        error: (error) => {
          console.error('Login failed', error);
          alert('Login failed!');
          // Handle login failure here, e.g., show an error message
        }
      });
    } else {
      alert('Some error ocuured!');
      console.log('Form is invalid');
    }
  }

  ngOnInit(): void {
  }
}
