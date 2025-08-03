// app-routing-module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Welcome } from './welcome/welcome';
import { LoginDashBoard } from './login-dash-board/login-dash-board';
import { UserLoginPage } from './user-login-page/user-login-page';
import { InstructorLoginPage } from './instructor-login-page/instructor-login-page';
import { ViewCourse } from './view-course/view-course';
import { ViewProfile } from './view-profile/view-profile';
import { AddCourse } from './add-course/add-course';
import { ViewAllUser } from './view-all-user/view-all-user';
import { ViewInstructor } from './view-instructor/view-instructor';
import { AllFeedBack } from './all-feed-back/all-feed-back';
import { NumberOfElements } from './number-of-elements/number-of-elements';
import { UserDashBoard } from './user-dash-board/user-dash-board';
import { ViewChapterBycourseId } from './view-chapter-bycourse-id/view-chapter-bycourse-id';










const routes: Routes = [
  { path: '', component: Welcome },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'welcome', component: Welcome },
  { path: 'Logindashboard', component: LoginDashBoard },
  { path: 'userlogindashboard', component: UserLoginPage },
  { path: 'instructorlogin', component: InstructorLoginPage },
  { path: 'ViewAllCourse', component: ViewCourse },
  { path: 'viewprofile', component: ViewProfile },
  { path: 'addcourse', component: AddCourse },
  { path: 'viewAlluser', component: ViewAllUser },
  { path: 'viewinstructor', component: ViewInstructor },
  { path: 'allFeedback', component: AllFeedBack },
  { path: 'numberOfElements', component: NumberOfElements },
  { path: 'userdashBoard', component: UserDashBoard },
  { path: 'viewChapterBycourseId', component: ViewChapterBycourseId },
  { path: 'ViewChapterBycourseId/: courseId', component: ViewChapterBycourseId },
  




 


  


];   

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
