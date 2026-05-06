/**
 * Modelos TypeScript — Tipado estricto 1:1 con los DTOs del Backend.
 * Todas las fechas llegan como strings ISO-8601 desde Jackson.
 */

// ============================================================
// Paciente
// ============================================================

export interface PacienteRequest {
  nombre: string;
  rut: string;
  email: string;
  telefono?: string;
}

export interface PacienteResponse {
  id: number;
  nombre: string;
  rut: string;
  email: string;
  telefono: string | null;
  activo: boolean;
  fechaCreacion: string;
}

// ============================================================
// Odontólogo
// ============================================================

export interface OdontologoRequest {
  nombre: string;
  rut: string;
  especialidad: string;
}

export interface OdontologoResponse {
  id: number;
  nombre: string;
  rut: string;
  especialidad: string;
  activo: boolean;
  fechaCreacion: string;
}

// ============================================================
// Cita
// ============================================================

export interface CitaRequest {
  pacienteId: number;
  odontologoId: number;
  fecha: string;   // ISO-8601: "2026-05-15"
  hora: string;    // ISO-8601: "09:30"
}

export interface CitaResponse {
  id: number;
  fecha: string;
  hora: string;
  activo: boolean;
  fechaCreacion: string;
  pacienteId: number;
  pacienteNombre: string;
  pacienteRut: string;
  odontologoId: number;
  odontologoNombre: string;
  odontologoEspecialidad: string;
}

// ============================================================
// Error Response (del @RestControllerAdvice del backend)
// ============================================================

export interface ErrorResponse {
  status: number;
  error: string;
  mensaje: string;
  timestamp: string;
}

// ============================================================
// Bloque de hora disponible (algoritmo dinámico)
// ============================================================

export interface BloqueHorario {
  hora: string;
  disponible: boolean;
}
