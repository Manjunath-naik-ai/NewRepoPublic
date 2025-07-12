import { Component } from '@angular/core';
import { Lzservice } from '../services/lzservice';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-view-instructor',
  standalone: false,
  templateUrl: './view-instructor.html',
  styleUrl: './view-instructor.css'
})
export class ViewInstructor implements OnInit{
  ngOnInit(): void {
    this.loadInstructors();
  }
  instructors: any[] = [];

  errorMessage: string = '';
  constructor(private lzservice: Lzservice, private router: Router) { }
  loadInstructors(): void {
    console.log("Loading instructors...");  
    this.lzservice.viewAllInstructor().subscribe({
      next: (instructors: any[]) => {
        this.instructors = instructors;
        console.log(instructors)
      },
      error: (err) => {
        console.error('Error loading instructors:', err);
        this.errorMessage = 'Failed to load instructors. Please try again later.';
      }
      
    });
  }
 
}
