import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Iuser } from '../Interfaces/Iuser';
import { Router } from '@angular/router';
import { Lzservice } from '../services/lzservice';
  

@Component({
  selector: 'app-login-dash-board',
  standalone: false,
  templateUrl: './login-dash-board.html',
  styleUrl: './login-dash-board.css'
})
export class LoginDashBoard  implements OnInit{
  constructor(private lzservice: Lzservice, private router: Router) { }

  selectedSection: string = '';

  showSection(section: string) {
    this.selectedSection = section;
  }

  //showCourses()
  //showUsers()
  //showInstructors()
  //showFeedbacks()
 
  ngOnInit(): void {
  }
 
}
