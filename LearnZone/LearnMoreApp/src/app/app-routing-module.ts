// app-routing-module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Welcome } from './welcome/welcome';
import { LoginDashBoard } from './login-dash-board/login-dash-board';
import { UserLoginPage } from './user-login-page/user-login-page';
import { InstructorLoginPage } from './instructor-login-page/instructor-login-page';


const routes: Routes = [
  { path: '', component: Welcome },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'welcome', component: Welcome },
  { path: 'Logindashboard', component: LoginDashBoard },
  { path: 'userlogindashboard', component: UserLoginPage },
  { path: 'instructorlogin', component: InstructorLoginPage }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
