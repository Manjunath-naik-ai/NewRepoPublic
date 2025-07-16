import { Component } from '@angular/core';
import { Lzservice } from '../services/lzservice';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-number-of-elements',
  standalone: false,
  templateUrl: './number-of-elements.html',
  styleUrl: './number-of-elements.css'
})
export class NumberOfElements implements OnInit  {
  ngOnInit(): void {
  
  }
  counts: Number = 0;
  errorMessage: string = '';
  constructor(private lzservice: Lzservice, private router: Router) { }
  //pass int from form
  onSubmit(form: NgForm) {
    const inputValue = form.value.inputNumber; // Assuming your form has an input with name 'inputNumber'
    this.lzservice.numberOfEnrollments(inputValue).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.counts = response; // Assuming the response is a number
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = 'Failed to retrieve count. Please try again later.';
      }
    });
  }
  

}
