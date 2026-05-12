import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClinicaService } from '../../../core/services/clinica.service';
import { TestimonioService } from '../../../core/services/testimonio.service';
import { PacienteResponse, OdontologoResponse, CitaResponse } from '../../../shared/models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private readonly clinicaService = inject(ClinicaService);
  readonly testimonioService = inject(TestimonioService);

  readonly pacientes = signal<PacienteResponse[]>([]);
  readonly odontologos = signal<OdontologoResponse[]>([]);
  readonly citas = signal<CitaResponse[]>([]);
  readonly isLoading = signal(true);

  readonly usuario = signal(localStorage.getItem('clinica_usuario') || 'Usuario');

  ngOnInit(): void {
    this._cargarDatos();
  }

  private _cargarDatos(): void {
    this.isLoading.set(true);

    // Cargar datos en paralelo sin subscribe() manual:
    // Usamos las callbacks de subscribe solo dentro del servicio de carga
    this.clinicaService.getPacientes().subscribe({
      next: (data) => this.pacientes.set(data),
      error: () => this.pacientes.set([])
    });

    this.clinicaService.getOdontologos().subscribe({
      next: (data) => this.odontologos.set(data),
      error: () => this.odontologos.set([])
    });

    this.clinicaService.getCitas().subscribe({
      next: (data) => {
        this.citas.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.citas.set([]);
        this.isLoading.set(false);
      }
    });
  }
}
