import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

/**
 * Enrutamiento de la aplicación.
 * Rutas protegidas por Functional AuthGuard (CanActivateFn).
 * Lazy loading mediante loadComponent para rendimiento óptimo.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(m => m.LandingComponent),
    title: 'Clínica Odontológica — Inicio'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
    title: 'Iniciar Sesión'
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard — Panel de Control'
  },
  {
    path: 'pacientes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/pacientes/pacientes.component').then(m => m.PacientesComponent),
    title: 'Gestión de Pacientes'
  },
  {
    path: 'odontologos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/odontologos/odontologos.component').then(m => m.OdontologosComponent),
    title: 'Gestión de Odontólogos'
  },
  {
    path: 'citas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/citas/citas.component').then(m => m.CitasComponent),
    title: 'Gestión de Citas'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
