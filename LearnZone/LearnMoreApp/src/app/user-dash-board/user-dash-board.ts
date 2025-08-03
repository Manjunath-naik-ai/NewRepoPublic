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
    console.log(sessionStorage.getItem('user'));
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

  Enroll(courseId: number) {
    console.log("Raw course.id:", courseId, "Type:", typeof courseId);

    const user: Iuser = JSON.parse(sessionStorage.getItem('user') || '{}');
   


        if (!user ) {
      alert("Please log in to enroll in a course.");
        return;
        }
    this.lzservice.enrollCourse(user.id, courseId).subscribe({

      next: (response) => {
        console.log('Enrollment successful:', response);
        alert("Successfully enrolled in the course.");
      },
      error: (error) => {
        console.error('Error enrolling in course:', error);
        alert("Failed to enroll in the course. Please try again later.");
      }
    });
  }

}
