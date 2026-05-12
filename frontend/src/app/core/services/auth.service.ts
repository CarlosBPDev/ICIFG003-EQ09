import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Servicio de Autenticación con roles.
 * Roles: 'admin' | 'paciente'
 * Credenciales:
 *   admin/admin → rol admin → Dashboard administrativo
 *   user/user   → rol paciente → Portal del Paciente
 */

export type UserRole = 'admin' | 'paciente' | null;

export interface AuthUser {
  username: string;
  role: UserRole;
  displayName: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly _user = signal<AuthUser | null>(null);

  /** Signal público */
  readonly user = computed(() => this._user());
  readonly isLoggedIn = computed(() => !!this._user());
  readonly role = computed(() => this._user()?.role ?? null);
  readonly isAdmin = computed(() => this._user()?.role === 'admin');

  constructor(private readonly router: Router) {
    // Restaurar sesión al iniciar
    this._restoreSession();
  }

  /**
   * Intento de login.
   * Retorna true si las credenciales son válidas.
   */
  login(username: string, password: string): boolean {
    const u = username.trim().toLowerCase();
    const p = password.trim();

    if (u === 'admin' && p === 'admin') {
      const user: AuthUser = { username: 'admin', role: 'admin', displayName: 'Administrador' };
      this._setSession(user);
      return true;
    }

    if (u === 'user' && p === 'user') {
      const user: AuthUser = { username: 'user', role: 'paciente', displayName: 'Paciente' };
      this._setSession(user);
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('clinica_session');
    this._user.set(null);
    this.router.navigate(['/']);
  }

  private _setSession(user: AuthUser): void {
    localStorage.setItem('clinica_session', JSON.stringify(user));
    // Mantener clave vieja para compatibilidad con el guard existente
    localStorage.setItem('clinica_usuario', user.displayName);
    this._user.set(user);
  }

  private _restoreSession(): void {
    try {
      const raw = localStorage.getItem('clinica_session');
      if (raw) {
        const user: AuthUser = JSON.parse(raw);
        this._user.set(user);
      }
    } catch {
      localStorage.removeItem('clinica_session');
    }
  }
}
