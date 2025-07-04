import { Component } from '@angular/core';
import { Lzservice } from '../services/lzservice';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  constructor(private lzservice: Lzservice) { }

  SubmitRegister(form: NgForm): void {
    if (form.valid) {
      const { name, email, password } = form.value;
      this.lzservice.Register(name, email, password).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Handle successful registration (e.g., show message, navigate)
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Handle registration error (e.g., show error message)
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
