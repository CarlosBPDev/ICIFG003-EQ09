/**
 * Modelos TypeScript — Tipado estricto 1:1 con las Entidades JPA del Backend.
 * El backend NO usa DTOs, devuelve las entidades directamente.
 */

// ============================================================
// Paciente (Backend: Paciente.java)
// Campos: id, rut, nombre, apellido, email, telefono, fechaNacimiento, direccion
// ============================================================

export interface PacienteRequest {
  rut: string;
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
  fechaNacimiento?: string;
  direccion?: string;
}

export interface PacienteResponse {
  id: number;
  rut: string;
  nombre: string;
  apellido: string;
  email: string | null;
  telefono: string | null;
  fechaNacimiento: string | null;
  direccion: string | null;
}

// ============================================================
// Odontólogo / Dentista (Backend: Dentista.java)
// Campos: id, rut, nombre, apellido, especialidad, email, telefono
// ============================================================

export interface OdontologoRequest {
  rut: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  email?: string;
  telefono?: string;
}

export interface OdontologoResponse {
  id: number;
  rut: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  email: string | null;
  telefono: string | null;
}

// ============================================================
// Cita (Backend: Cita.java)
// El backend espera el objeto Cita con entidades anidadas
// ============================================================

export interface CitaRequest {
  paciente: { id: number };
  dentista: { id: number };
  servicio: { id: number };
  fecha: string;   // ISO-8601: "2026-05-15"
  hora: string;    // "09:30"
  notas?: string;
}

export interface CitaResponse {
  id: number;
  fecha: string;
  hora: string;
  estado: 'RESERVADA' | 'CANCELADA' | 'COMPLETADA';
  notas: string | null;
  paciente: PacienteResponse;
  dentista: OdontologoResponse;
  servicio: ServicioResponse;
}

// ============================================================
// Servicio (Backend: Servicio.java)
// ============================================================

export interface ServicioResponse {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  duracionMinutos: number;
}

// ============================================================
// Error Response
// ============================================================

export interface ErrorResponse {
  status: number;
  error: string;
  mensaje: string;
  timestamp: string;
}

// ============================================================
// Bloque de hora disponible
// ============================================================

export interface BloqueHorario {
  hora: string;
  disponible: boolean;
}
