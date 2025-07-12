import { Component, OnInit } from '@angular/core';
import { Lzservice } from '../services/lzservice';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-all-user',
  standalone: false,
  templateUrl: './view-all-user.html',
  styleUrl: './view-all-user.css'
})
export class ViewAllUser implements OnInit{

  users: any[] = [];
  errorMessage: string = '';
  constructor(private lzservice: Lzservice) { }
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(): void {
    this.lzservice.viewAllUser().subscribe({
      next: (users: any[]) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.errorMessage = 'Failed to load users. Please try again later.';
      }
    });
  }

}
