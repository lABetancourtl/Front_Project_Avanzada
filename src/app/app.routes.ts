import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthenticateComponent } from './auth/authenticate/authenticate.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'autenticacion', component: AuthenticateComponent },
  { path: '**', redirectTo: 'login' }
];