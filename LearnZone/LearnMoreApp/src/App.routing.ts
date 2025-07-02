import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Login } from './app/login/login';
import { Welcome } from './app/welcome/welcome';
import { Register } from './app/register/register';


const routes: Routes = [
  {path: '',component:Welcome},
  { path: 'login', component: Login },
  { path: 'register', component: Register }, 

];
export const AppRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, {
  initialNavigation: 'enabledBlocking',
 
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload'
});
