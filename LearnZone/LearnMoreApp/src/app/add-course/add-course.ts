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
  courseName: string = '';
  courseDescription: string = '';
  instructorId: number = 0;
  constructor(private lzservice: Lzservice, private router: Router) { }

  onSubmit() {
    this.lzservice.addCourse(this.courseName, this.courseDescription, this.instructorId)
      .subscribe({
        next: (res) => {
          alert('Course added successfully!');
        },
        error: (err) => {
          alert('Error adding course.');
          console.error(err);
        }
      });
  }
}
