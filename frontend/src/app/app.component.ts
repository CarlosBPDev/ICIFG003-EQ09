import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { NotificationService, Toast } from './core/services/notification.service';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/header-footer.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);
  private routerSub!: Subscription;

  readonly toasts = this.notificationService.toasts;
  readonly isLoggedIn = signal(false);
  readonly currentUser = signal('');
  readonly showNavbar = signal(false);
  readonly mobileMenuOpen = signal(false);

  ngOnInit(): void {
    this._checkAuthState();
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this._checkAuthState();
        this.mobileMenuOpen.set(false);
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  private _checkAuthState(): void {
    const user = localStorage.getItem('clinica_usuario');
    this.isLoggedIn.set(!!user);
    this.currentUser.set(user || '');

    const url = this.router.url;
    const isPublicPage = url === '/' || url === '/login';
    this.showNavbar.set(!isPublicPage && this.isLoggedIn());
  }

  logout(): void {
    localStorage.removeItem('clinica_usuario');
    this.isLoggedIn.set(false);
    this.currentUser.set('');
    this.showNavbar.set(false);
    this.router.navigate(['/']);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
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
