import { Component } from '@angular/core';
import { Lzservice } from '../services/lzservice';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-all-feed-back',
  standalone: false,
  templateUrl: './all-feed-back.html',
  styleUrl: './all-feed-back.css'
})
export class AllFeedBack implements OnInit {
  ngOnInit(): void {
    this.loadFeedbacks();
  }
  feedbacks: any[] = [];
  errorMessage: string = '';
  constructor(private lzservice: Lzservice, private router: Router) { }
  loadFeedbacks(): void {
    this.lzservice.viewAllFeedback().subscribe({
      next: (feedbacks: any[]) => {
        this.feedbacks = feedbacks;
      },
      error: (err) => {
        console.error('Error loading feedbacks:', err);
        this.errorMessage = 'Failed to load feedbacks. Please try again later.';
      }
    });
  }

}
