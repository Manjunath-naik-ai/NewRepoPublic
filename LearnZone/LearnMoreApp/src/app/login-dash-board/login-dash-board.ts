import { Component } from '@angular/core';

@Component({
  selector: 'app-login-dash-board',
  standalone: false,
  templateUrl: './login-dash-board.html',
  styleUrl: './login-dash-board.css'
})
export class LoginDashBoard {
  [x: string]: any;
  role = this['Sessionstorage'].getItem('role'); 
}
