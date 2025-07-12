import { Component, OnInit } from '@angular/core';
import { Lzservice } from '../services/lzservice';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-view-course',
  standalone: false,
  templateUrl: './view-course.html',
  styleUrl: './view-course.css'
})
export class ViewCourse implements OnInit  {

  courses: any[] = [];
  errorMessage: string = '';
  constructor(private lzservice: Lzservice, private router: Router) { }
  ngOnInit(): void {
    this.loadCourses();
  }
  loadCourses(): void {
    this.lzservice.viewAllCourse().subscribe({
      next: (courses: any[]) => {
        this.courses = courses;
      },
      error: (err) => {
        console.error('Error loading courses:', err);
        this.errorMessage = 'Failed to load courses. Please try again later.';
      }
    });
  }
  
}
