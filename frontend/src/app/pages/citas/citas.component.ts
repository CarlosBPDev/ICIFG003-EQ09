import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClinicaService } from '../../services/clinica.service';
import { NotificationService } from '../../services/notification.service';
import {
  CitaResponse,
  OdontologoResponse,
  PacienteResponse
} from '../../models/models';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './citas.component.html'
})
export class CitasComponent implements OnInit {
  private readonly clinicaService = inject(ClinicaService);
  private readonly notificationService = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  // ============================================================
  // State (100% Signals)
  // ============================================================

  readonly citas = signal<CitaResponse[]>([]);
  readonly pacientes = signal<PacienteResponse[]>([]);
  readonly odontologos = signal<OdontologoResponse[]>([]);

  readonly horasDisponibles = signal<string[]>([]);
  readonly horaSeleccionada = signal<string | null>(null);

  readonly isLoading = signal(true);
  readonly isLoadingHoras = signal(false);
  readonly isSaving = signal(false);
  readonly showForm = signal(false);

  /** Computed: controla si el usuario puede reservar */
  readonly puedeReservar = computed(() =>
    this.horaSeleccionada() !== null &&
    this.citaForm.valid &&
    !this.isSaving()
  );

  /** Fecha mínima para el input date (hoy en ISO-8601) */
  readonly fechaMinima = signal(new Date().toISOString().split('T')[0]);

  // ============================================================
  // Typed Reactive Form
  // ============================================================

  readonly citaForm: FormGroup = this.fb.group({
    pacienteId: [null as number | null, [Validators.required]],
    odontologoId: [null as number | null, [Validators.required]],
    fecha: ['', [Validators.required]]
  });

  // ============================================================
  // Lifecycle
  // ============================================================

  ngOnInit(): void {
    this._cargarDatos();
  }

  // ============================================================
  // Acciones del usuario
  // ============================================================

  abrirFormulario(): void {
    this.citaForm.reset();
    this.horasDisponibles.set([]);
    this.horaSeleccionada.set(null);
    this.showForm.set(true);
  }

  cerrarFormulario(): void {
    this.showForm.set(false);
    this.citaForm.reset();
    this.horasDisponibles.set([]);
    this.horaSeleccionada.set(null);
  }

  /**
   * Cuando el usuario selecciona odontólogo Y fecha,
   * consultamos al backend por las horas disponibles.
   */
  consultarDisponibilidad(): void {
    const odontologoId = this.citaForm.get('odontologoId')?.value;
    const fecha = this.citaForm.get('fecha')?.value;

    if (!odontologoId || !fecha) {
      this.horasDisponibles.set([]);
      this.horaSeleccionada.set(null);
      return;
    }

    this.isLoadingHoras.set(true);
    this.horaSeleccionada.set(null);

    this.clinicaService.getHorasDisponibles(odontologoId, fecha).subscribe({
      next: (horas) => {
        this.horasDisponibles.set(horas);
        this.isLoadingHoras.set(false);
      },
      error: () => {
        this.horasDisponibles.set([]);
        this.isLoadingHoras.set(false);
      }
    });
  }

  seleccionarHora(hora: string): void {
    this.horaSeleccionada.set(hora);
  }

  reservar(): void {
    const hora = this.horaSeleccionada();
    if (this.citaForm.invalid || !hora) {
      this.citaForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);

    const request = {
      pacienteId: this.citaForm.get('pacienteId')?.value,
      odontologoId: this.citaForm.get('odontologoId')?.value,
      fecha: this.citaForm.get('fecha')?.value,
      hora: hora
    };

    this.clinicaService.crearCita(request).subscribe({
      next: (cita) => {
        this.notificationService.success(
          'Cita Reservada',
          `Cita agendada para ${cita.fecha} a las ${cita.hora} con ${cita.odontologoNombre}`
        );
        this.cerrarFormulario();
        this._cargarCitas();
        this.isSaving.set(false);
      },
      error: () => {
        this.isSaving.set(false);
      }
    });
  }

  cancelarCita(cita: CitaResponse): void {
    if (!confirm(`¿Cancelar la cita de ${cita.pacienteNombre} el ${cita.fecha} a las ${cita.hora}?`)) return;

    this.clinicaService.cancelarCita(cita.id).subscribe({
      next: () => {
        this.notificationService.success('Cita Cancelada', `La cita #${cita.id} fue cancelada exitosamente`);
        this._cargarCitas();
      }
    });
  }

  // ============================================================
  // Carga de datos
  // ============================================================

  private _cargarDatos(): void {
    this.isLoading.set(true);

    this.clinicaService.getPacientes().subscribe({
      next: (data) => this.pacientes.set(data.filter(p => p.activo)),
      error: () => this.pacientes.set([])
    });

    this.clinicaService.getOdontologos().subscribe({
      next: (data) => this.odontologos.set(data.filter(o => o.activo)),
      error: () => this.odontologos.set([])
    });

    this._cargarCitas();
  }

  private _cargarCitas(): void {
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
