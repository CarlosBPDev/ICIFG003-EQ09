import { Injectable, signal, computed } from '@angular/core';

/**
 * Servicio de Notificaciones/Toasts.
 * Usa Signals para estado reactivo del UI.
 * Los toasts se auto-eliminan después de 5 segundos.
 */

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private _toasts = signal<Toast[]>([]);
  private _nextId = 0;

  /** Signal público de solo lectura */
  readonly toasts = computed(() => this._toasts());

  success(title: string, message: string): void {
    this._addToast('success', title, message);
  }

  error(title: string, message: string): void {
    this._addToast('error', title, message);
  }

  warning(title: string, message: string): void {
    this._addToast('warning', title, message);
  }

  info(title: string, message: string): void {
    this._addToast('info', title, message);
  }

  dismiss(id: number): void {
    this._toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  private _addToast(type: Toast['type'], title: string, message: string): void {
    const id = this._nextId++;
    const toast: Toast = { id, type, title, message };

    this._toasts.update(toasts => [...toasts, toast]);

    // Auto-dismiss después de 5 segundos
    setTimeout(() => this.dismiss(id), 5000);
  }
}
