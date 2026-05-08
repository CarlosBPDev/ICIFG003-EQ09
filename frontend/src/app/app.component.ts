import { Component, inject, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NotificationService, Toast } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/header-footer.css']
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);

  readonly toasts = this.notificationService.toasts;
  readonly isLoggedIn = computed(() => !!localStorage.getItem('clinica_usuario'));
  readonly currentUser = computed(() => localStorage.getItem('clinica_usuario') || '');

  /** Muestra la navbar solo si NO estamos en la landing ni en login */
  showNavbar = computed(() => {
    const url = this.router.url;
    return url !== '/' && url !== '/login';
  });

  logout(): void {
    localStorage.removeItem('clinica_usuario');
    this.router.navigate(['/']);
  }

  dismissToast(id: number): void {
    this.notificationService.dismiss(id);
  }

  getToastIcon(type: Toast['type']): string {
    const icons: Record<string, string> = {
      success: 'bi-check-circle-fill',
      error: 'bi-exclamation-triangle-fill',
      warning: 'bi-exclamation-circle-fill',
      info: 'bi-info-circle-fill'
    };
    return icons[type] || 'bi-info-circle-fill';
  }

  getToastColor(type: Toast['type']): string {
    const colors: Record<string, string> = {
      success: 'var(--success)',
      error: 'var(--danger)',
      warning: 'var(--warning)',
      info: 'var(--primary)'
    };
    return colors[type] || 'var(--primary)';
  }
}
