import { Component, OnInit } from '@angular/core';
import { Lzservice } from '../services/lzservice';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  standalone: false,
  templateUrl: './add-course.html',
  styleUrl: './add-course.css'
})
export class AddCourse implements OnInit{
  ngOnInit(): void {

  }
  constructor(private lzservice: Lzservice, private router: Router) { }
  //addcourse(form: NgForm): void {
  //  if (form.valid) {
  //    const { courseName, courseDescription, instructorId } = form.value;
  //    this.lzservice.addCourse(courseName, courseDescription, instructorId).subscribe({
  //      next: (response: any) => {
  //        console.log('Course added successfully:', response);
  //        alert('Course added successfully!');
  //        this.router.navigate(['/viewAllCourses']);
  //      },
  //      error: (err) => {
  //        console.error('Error adding course:', err);
  //        alert('Failed to add course. Please try again later.');
  //      }
  //    });
  //  } else {
  //    alert('Please fill in all required fields.');
  //  }
  //}
}
