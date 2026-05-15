import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

/**
 * Enrutamiento de la aplicación.
 * Rutas protegidas por Functional AuthGuard (CanActivateFn).
 * Lazy loading mediante loadComponent para rendimiento óptimo.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/pages/landing.component').then(m => m.LandingComponent),
    title: 'Clínica Odontológica — Inicio'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/pages/login.component').then(m => m.LoginComponent),
    title: 'Iniciar Sesión'
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard — Panel de Control'
  },
  {
    path: 'mi-portal',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/portal-paciente/pages/portal-paciente.component').then(m => m.PortalPacienteComponent),
    title: 'Mi Portal — OdontoCare'
  },
  {
    path: 'pacientes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/personas/pages/pacientes.component').then(m => m.PacientesComponent),
    title: 'Gestión de Pacientes'
  },
  {
    path: 'odontologos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/odontologos/pages/odontologos.component').then(m => m.OdontologosComponent),
    title: 'Gestión de Odontólogos'
  },
  {
    path: 'citas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/citas/pages/citas.component').then(m => m.CitasComponent),
    title: 'Gestión de Citas'
  },
  {
    path: 'servicios',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/servicios/pages/servicios.component').then(m => m.ServiciosComponent),
    title: 'Gestión de Servicios'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
