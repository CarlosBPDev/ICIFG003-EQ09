import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PacienteRequest,
  PacienteResponse,
  OdontologoRequest,
  OdontologoResponse,
  CitaRequest,
  CitaResponse
} from '../models/models';
import { environment } from '../../environments/environment';

/**
 * Servicio Central de la Clínica.
 * Conecta con el backend REST /api/v1/...
 * Retorna Observables — los componentes los convierten a Signals con toSignal().
 */
@Injectable({ providedIn: 'root' })
export class ClinicaService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  // ============================================================
  // PACIENTES
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

  desactivarPaciente(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/pacientes/${id}/desactivar`, {});
  }

  // ============================================================
  // ODONTÓLOGOS
  // ============================================================

  getOdontologos(): Observable<OdontologoResponse[]> {
    return this.http.get<OdontologoResponse[]>(`${this.apiUrl}/odontologos`);
  }

  getOdontologo(id: number): Observable<OdontologoResponse> {
    return this.http.get<OdontologoResponse>(`${this.apiUrl}/odontologos/${id}`);
  }

  crearOdontologo(odontologo: OdontologoRequest): Observable<OdontologoResponse> {
    return this.http.post<OdontologoResponse>(`${this.apiUrl}/odontologos`, odontologo);
  }

  actualizarOdontologo(id: number, odontologo: OdontologoRequest): Observable<OdontologoResponse> {
    return this.http.put<OdontologoResponse>(`${this.apiUrl}/odontologos/${id}`, odontologo);
  }

  desactivarOdontologo(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/odontologos/${id}/desactivar`, {});
  }

  // ============================================================
  // CITAS
  // ============================================================

  getCitas(): Observable<CitaResponse[]> {
    return this.http.get<CitaResponse[]>(`${this.apiUrl}/citas`);
  }

  crearCita(cita: CitaRequest): Observable<CitaResponse> {
    return this.http.post<CitaResponse>(`${this.apiUrl}/citas`, cita);
  }

  cancelarCita(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/citas/${id}/cancelar`, {});
  }

  /**
   * Obtiene las horas disponibles para un odontólogo en una fecha.
   * El backend genera bloques de 30 min (09:00–17:00) y filtra los ocupados.
   * Retorna un array de strings con las horas libres: ["09:00", "09:30", ...]
   */
  getHorasDisponibles(odontologoId: number, fecha: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.apiUrl}/citas/disponibilidad`,
      { params: { odontologoId: odontologoId.toString(), fecha } }
    );
  }
}
