import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { Lzservice } from './services/lzservice'; 
import { App } from './app';
import { Login } from './login/login';
import { Register } from './register/register';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Welcome } from './welcome/welcome';
import { LoginDashBoard } from './login-dash-board/login-dash-board';
import { Navbar } from './navbar/navbar';
import { User } from './user/user';
import { InstructorLoginPage } from './instructor-login-page/instructor-login-page';
import { UserLoginPage } from './user-login-page/user-login-page';




@NgModule({
  declarations: [
    App,
    Login,
    Register,
    Welcome,
    LoginDashBoard,
    Navbar,
    User,
    InstructorLoginPage,
    UserLoginPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
   AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    Lzservice
  ],
  bootstrap: [App]
})
export class AppModule { }
