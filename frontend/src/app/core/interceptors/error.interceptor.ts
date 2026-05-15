import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

/**
 * Functional HTTP Interceptor (HttpInterceptorFn).
 *
 * Captura errores HTTP del backend y muestra un toast con el mensaje.
 * Compatible con el formato de GlobalExceptionHandler del backend:
 * { status, error, mensaje, timestamp }
 *
 * También maneja el formato estándar de Spring Boot:
 * { status, error, message, path, timestamp }
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let mensaje = 'Ha ocurrido un error inesperado';

      if (error.error && typeof error.error === 'object') {
        const errorBody = error.error;
        // Nuestro formato personalizado: { mensaje, error }
        // Formato Spring Boot estándar: { message, error }
        mensaje = errorBody.mensaje || errorBody.message || errorBody.error || mensaje;

        // Si hay errores de validación en un array (Spring Boot default)
        if (errorBody.errors && Array.isArray(errorBody.errors)) {
          mensaje = errorBody.errors
            .map((e: any) => e.defaultMessage || e.message || e)
            .join('; ');
        }
      } else if (typeof error.error === 'string') {
        mensaje = error.error;
      }

      switch (error.status) {
        case 400:
          notificationService.error('Solicitud Inválida', mensaje);
          break;
        case 404:
          notificationService.error('No Encontrado', mensaje);
          break;
        case 409:
          notificationService.warning('Conflicto', mensaje);
          break;
        case 422:
          notificationService.error('Error de Validación', mensaje);
          break;
        case 0:
          notificationService.error('Sin Conexión', 'No se pudo conectar con el servidor. Verifique que el backend esté en ejecución.');
          break;
        default:
          notificationService.error('Error del Servidor', `Error ${error.status}: ${mensaje}`);
      }

      return throwError(() => error);
    })
  );
};
