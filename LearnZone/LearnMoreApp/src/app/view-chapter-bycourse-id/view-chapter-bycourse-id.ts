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

  ngOnInit(): void {
  }

  constructor(private lzservice: Lzservice, private route: ActivatedRoute, private http: HttpClient) { }
  chapters: any[] = [];
  

    

}
