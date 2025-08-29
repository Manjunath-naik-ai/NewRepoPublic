import { Component } from '@angular/core';
import { Lzservice } from '../services/lzservice';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  constructor(private lzservice: Lzservice, private router: Router) { }

  SubmitRegister(form: NgForm): void {
    if (form.valid) {
      const { name, email, password } = form.value;
      this.lzservice.Register(name, email, password).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          alert('Registration successful! Please log in.');
          this.router.navigate(['/login']);   

          
        },
        error: (error) => {
          console.error('Registration failed', error);
          alert('Registration  Failed Try Again');
         
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
