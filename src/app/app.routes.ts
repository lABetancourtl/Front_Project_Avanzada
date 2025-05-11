import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthenticateComponent } from './auth/authenticate/authenticate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioComponent } from './dashboard/pages/inicio/inicio.component';
import { ForgottenpasswordComponent } from './auth/forgottenpassword/forgottenpassword.component';
import { NewpasswordComponent } from './auth/newpassword/newpassword.component';
import { AuthGuard } from './auth.guard';
import { CrearReporteComponent } from './dashboard/pages/crear-reporte/crear-reporte.component';
import { EditarPerfilComponent } from './dashboard/pages/editar-perfil/editar-perfil.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'autenticacion', component: AuthenticateComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: InicioComponent },
      { path: 'reportes/crear', component: CrearReporteComponent },
      { path: 'editarPerfil', component: EditarPerfilComponent },
    ]
  },
  { path: 'cambiarPassword', component: ForgottenpasswordComponent },
  { path: 'nuevaclave', component: NewpasswordComponent },
  { path: '**', redirectTo: 'login' }
];