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
import { ViewCourse } from './view-course/view-course';
import { ViewAllUser } from './view-all-user/view-all-user';
import { ViewInstructor } from './view-instructor/view-instructor';
import { AllFeedBack } from './all-feed-back/all-feed-back';
import { AddCourse } from './add-course/add-course';
import { NumberOfElements } from './number-of-elements/number-of-elements';
import { ViewProfile } from './view-profile/view-profile';
import { UserDashBoard } from './user-dash-board/user-dash-board';
import { ViewCoures } from './view-coures/view-coures';
import { ViewChapters } from './view-chapters/view-chapters';
import { GiveFeedBack } from './give-feed-back/give-feed-back';




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
    UserLoginPage,
    ViewCourse,
    ViewAllUser,
    ViewInstructor,
    AllFeedBack,
    AddCourse,
    NumberOfElements,
    ViewProfile,
    UserDashBoard,
    ViewCoures,
    ViewChapters,
    GiveFeedBack
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
