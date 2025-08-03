import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Lzservice } from '../services/lzservice';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-view-chapter-bycourse-id',
  standalone: false,
  templateUrl: './view-chapter-bycourse-id.html',
  styleUrl: './view-chapter-bycourse-id.css'
})
export class ViewChapterBycourseId implements OnInit {

  courseId: number = 0;
  isLoading = false;
  errorMessage: string | null = null;
  chapters: any[] = [];


  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('courseId')!;
    this.isLoading = true;
    this.lzservice.getChapteronCourseId(this.courseId).subscribe({
      next: (data: any) => {
        this.chapters = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching chapters:', error);
        this.isLoading = false;
        this.errorMessage = 'Something went wrong while loading chapters. Please try again later.';
      },
      complete: () => {
        console.log('Chapter fetch completed');
      }
    });

  }

  constructor(private lzservice: Lzservice, private route: ActivatedRoute, private http: HttpClient) { }


  

    

}
