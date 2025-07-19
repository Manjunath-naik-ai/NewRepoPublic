import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lzservice } from '../services/lzservice';
import { Iuser } from '../Interfaces/Iuser';
import { ICourse } from '../Interfaces/crs';




@Component({
  selector: 'app-user-dash-board',
  standalone: false,
  templateUrl: './user-dash-board.html',
  styleUrl: './user-dash-board.css'
})
export class UserDashBoard implements OnInit {
  ngOnInit(): void {
    this.getAllCourses();
  }
  constructor(private router: Router, private lzservice: Lzservice) { }

  courses: ICourse[] = [];

  getAllCourses() {

    this.lzservice.viewAllCourse().subscribe({
      next: (data: any) => {
        this.courses = data;
        console.log('Courses fetched successfully:', this.courses);
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        alert("Failed to fetch courses. Please try again later.");
      }
    });

  }
}
