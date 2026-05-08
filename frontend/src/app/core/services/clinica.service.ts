import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PacienteRequest,
  PacienteResponse,
  OdontologoRequest,
  OdontologoResponse,
  CitaRequest,
  CitaResponse,
  ServicioResponse
} from '../../shared/models/models';
import { environment } from '../../../environments/environment';

/**
 * Servicio Central de la Clínica.
 * Conecta con el backend REST.
 *
 * RUTAS DEL BACKEND:
 *   - /api/pacientes     (GET, POST, PUT/{id}, DELETE/{id})
 *   - /api/dentistas     (GET, POST, PUT/{id}, DELETE/{id})
 *   - /api/servicios     (GET, POST, PUT/{id}, DELETE/{id})
 *   - /api/citas         (GET, GET/{id}, GET/paciente/{pacienteId})
 *   - /api/citas/reservar        (POST)
 *   - /api/citas/{id}/cancelar   (PUT)
 *   - /api/citas/disponibilidad  (GET ?dentistaId=X&fecha=YYYY-MM-DD)
 */
@Injectable({ providedIn: 'root' })
export class ClinicaService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  // ============================================================
  // PACIENTES  →  /api/pacientes
  // ============================================================

  getPacientes(): Observable<PacienteResponse[]> {
    return this.http.get<PacienteResponse[]>(`${this.apiUrl}/pacientes`);
  }

  getPaciente(id: number): Observable<PacienteResponse> {
    return this.http.get<PacienteResponse>(`${this.apiUrl}/pacientes/${id}`);
  }

  crearPaciente(paciente: PacienteRequest): Observable<PacienteResponse> {
    return this.http.post<PacienteResponse>(`${this.apiUrl}/pacientes`, paciente);
  }

  actualizarPaciente(id: number, paciente: PacienteRequest): Observable<PacienteResponse> {
    return this.http.put<PacienteResponse>(`${this.apiUrl}/pacientes/${id}`, paciente);
  }

  eliminarPaciente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pacientes/${id}`);
  }

  // ============================================================
  // ODONTÓLOGOS (DENTISTAS)  →  /api/dentistas
  // ============================================================

  getOdontologos(): Observable<OdontologoResponse[]> {
    return this.http.get<OdontologoResponse[]>(`${this.apiUrl}/dentistas`);
  }

  getOdontologo(id: number): Observable<OdontologoResponse> {
    return this.http.get<OdontologoResponse>(`${this.apiUrl}/dentistas/${id}`);
  }

  crearOdontologo(odontologo: OdontologoRequest): Observable<OdontologoResponse> {
    return this.http.post<OdontologoResponse>(`${this.apiUrl}/dentistas`, odontologo);
  }

  actualizarOdontologo(id: number, odontologo: OdontologoRequest): Observable<OdontologoResponse> {
    return this.http.put<OdontologoResponse>(`${this.apiUrl}/dentistas/${id}`, odontologo);
  }

  eliminarOdontologo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/dentistas/${id}`);
  }

  // ============================================================
  // SERVICIOS  →  /api/servicios
  // ============================================================

  getServicios(): Observable<ServicioResponse[]> {
    return this.http.get<ServicioResponse[]>(`${this.apiUrl}/servicios`);
  }

  // ============================================================
  // CITAS  →  /api/citas
  // ============================================================

  getCitas(): Observable<CitaResponse[]> {
    return this.http.get<CitaResponse[]>(`${this.apiUrl}/citas`);
  }

  /**
   * Reservar una cita.
   * Backend endpoint: POST /api/citas/reservar
   */
  crearCita(cita: CitaRequest): Observable<CitaResponse> {
    return this.http.post<CitaResponse>(`${this.apiUrl}/citas/reservar`, cita);
  }

  /**
   * Cancelar una cita.
   * Backend endpoint: PUT /api/citas/{id}/cancelar
   */
  cancelarCita(id: number): Observable<CitaResponse> {
    return this.http.put<CitaResponse>(`${this.apiUrl}/citas/${id}/cancelar`, {});
  }

  /**
   * Obtiene los horarios disponibles de un dentista en una fecha.
   * Backend endpoint: GET /api/citas/disponibilidad?dentistaId=X&fecha=YYYY-MM-DD
   */
  getHorasDisponibles(dentistaId: number, fecha: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/citas/disponibilidad`,
      { params: { dentistaId: dentistaId.toString(), fecha } }
    );
  }
}
