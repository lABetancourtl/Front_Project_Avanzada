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
<<<<<<< HEAD
import { EditarPerfilComponent } from './dashboard/pages/editar-perfil/editar-perfil.component';
=======
import { MisReportesComponent } from './dashboard/pages/mis-reportes/mis-reportes.component';
>>>>>>> a62b0d4a12d972585cfbe0231c829e77b62b3b7d

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'autenticacion', component: AuthenticateComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: InicioComponent },
      { path: 'reportes/crear', component: CrearReporteComponent },
<<<<<<< HEAD
      { path: 'editarPerfil', component: EditarPerfilComponent },
=======
      { path: 'reportes/mis', component: MisReportesComponent }
>>>>>>> a62b0d4a12d972585cfbe0231c829e77b62b3b7d
    ]
  },
  { path: 'cambiarPassword', component: ForgottenpasswordComponent },
  { path: 'nuevaclave', component: NewpasswordComponent },
  { path: '**', redirectTo: 'login' }
];