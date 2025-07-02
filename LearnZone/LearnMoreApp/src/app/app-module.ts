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



const routes: Routes = [
  { path: 'login', component: Login }, 
];

@NgModule({
  declarations: [
    App,
    Login,
    Register,
    Welcome
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
