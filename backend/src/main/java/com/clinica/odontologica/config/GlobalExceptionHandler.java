package com.clinica.odontologica.config;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Manejador global de excepciones.
 * Captura errores comunes y devuelve respuestas JSON consistentes
 * que el frontend puede interpretar correctamente.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Errores de validación (@Valid / @NotBlank / @Email, etc.)
     * Status: 400 Bad Request
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        String mensaje = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
                .collect(Collectors.joining("; "));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(buildError(400, "Error de Validación", mensaje));
    }

    /**
     * Violación de integridad de datos (duplicados, FK constraints).
     * Status: 409 Conflict
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleDataIntegrity(DataIntegrityViolationException ex) {
        String mensaje = "No se puede completar la operación debido a restricciones de datos";

        String rootMsg = ex.getMostSpecificCause().getMessage();
        if (rootMsg != null) {
            String lower = rootMsg.toLowerCase();
            if (lower.contains("unique") || lower.contains("duplicate") || lower.contains("uq_") || lower.contains("_unique_")) {
                mensaje = "Ya existe un registro con esos datos. Verifique que no haya duplicados (RUT, nombre, etc.)";
            } else if (lower.contains("foreign key") || lower.contains("referential integrity")
                    || lower.contains("fk_") || lower.contains("cannot delete")) {
                mensaje = "No se puede eliminar este registro porque tiene datos relacionados (citas, horarios, etc.). Elimine primero los registros dependientes.";
            }
        }

        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(buildError(409, "Conflicto de Datos", mensaje));
    }

    /**
     * Errores de negocio (RuntimeException lanzados por los servicios).
     * Status: 400 Bad Request
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntime(RuntimeException ex) {
        String mensaje = ex.getMessage() != null ? ex.getMessage() : "Error inesperado";

        // Si el mensaje indica "no encontrado", usar 404
        if (mensaje.toLowerCase().contains("no encontrad")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(buildError(404, "No Encontrado", mensaje));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(buildError(400, "Error de Solicitud", mensaje));
    }

    private Map<String, Object> buildError(int status, String error, String mensaje) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", status);
        body.put("error", error);
        body.put("mensaje", mensaje);
        body.put("timestamp", LocalDateTime.now().toString());
        return body;
    }
}
