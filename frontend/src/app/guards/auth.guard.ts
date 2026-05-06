import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

/**
 * Functional AuthGuard (CanActivateFn).
 * Verifica si existe un usuario autenticado en localStorage.
 * Si no, redirige al login.
 */
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const usuario = localStorage.getItem('clinica_usuario');

  if (usuario) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
