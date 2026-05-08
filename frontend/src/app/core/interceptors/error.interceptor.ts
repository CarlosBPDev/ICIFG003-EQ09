import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { ErrorResponse } from '../../shared/models/models';

/**
 * Functional HTTP Interceptor (HttpInterceptorFn).
 *
 * Captura errores HTTP del backend (400, 404, 409, 422)
 * y lee el ErrorResponseDTO para mostrar un toast con el mensaje.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let mensaje = 'Ha ocurrido un error inesperado';

      if (error.error && typeof error.error === 'object') {
        // Lee el ErrorResponseDTO del backend
        const errorBody = error.error as ErrorResponse;
        mensaje = errorBody.mensaje || errorBody.error || mensaje;
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
