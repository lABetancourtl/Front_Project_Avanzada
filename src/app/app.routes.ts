import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthenticateComponent } from './auth/authenticate/authenticate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component'; // AÑADIR ESTO
import { InicioComponent } from './dashboard/pages/inicio/inicio.component';
import { ForgottenpasswordComponent } from './auth/forgottenpassword/forgottenpassword.component';
import { NewpasswordComponent } from './auth/newpassword/newpassword.component';
import { AuthGuard } from './auth.guard';
import { CrearReporteComponent } from './dashboard/pages/crear-reporte/crear-reporte.component';
import { EditarPerfilComponent } from './dashboard/pages/editar-perfil/editar-perfil.component';
import { MisReportesComponent } from './dashboard/pages/mis-reportes/mis-reportes.component';

import { AdminInicioComponent } from './dashboard-admin/pages/admin-inicio/admin-inicio.component';
import { GestionCategoriasComponent } from './dashboard-admin/pages/gestion-categorias/gestion-categorias.component';
import { GestionReportesComponent } from './dashboard-admin/pages/gestion-reportes/gestion-reportes.component';
import { ResolverReportesComponent } from './dashboard-admin/pages/resolver-reportes/resolver-reportes.component';
import { EditarPerfilAdminComponent } from './dashboard-admin/editar-perfil-admin/editar-perfil-admin.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'autenticacion', component: AuthenticateComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: InicioComponent },
      { path: 'reportes/crear', component: CrearReporteComponent },
      { path: 'editarPerfil', component: EditarPerfilComponent },
      { path: 'reportes/mis', component: MisReportesComponent }
    ]
  },

  // NUEVO: DASHBOARD ADMINISTRADOR
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminInicioComponent },
      { path: 'categorias', component: GestionCategoriasComponent },
      { path: 'reportes', component: GestionReportesComponent },
      { path: 'editarPerfilAdmin', component: EditarPerfilAdminComponent },
      { path: 'resolver', component: ResolverReportesComponent }
    ]
  },

  { path: 'cambiarPassword', component: ForgottenpasswordComponent },
  { path: 'nuevaclave', component: NewpasswordComponent },
  { path: '**', redirectTo: 'login' }
];
