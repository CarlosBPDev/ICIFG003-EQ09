import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClinicaService } from '../../../core/services/clinica.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TestimonioService } from '../../../core/services/testimonio.service';
import { AuthService } from '../../../core/services/auth.service';
import {
  OdontologoResponse,
  CitaResponse,
  ServicioResponse
} from '../../../shared/models/models';

@Component({
  selector: 'app-portal-paciente',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './portal-paciente.component.html'
})
export class PortalPacienteComponent implements OnInit {
  private readonly clinicaService = inject(ClinicaService);
  private readonly notificationService = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly testimonioService = inject(TestimonioService);
  private readonly authService = inject(AuthService);

  // ============================================================
  // State
  // ============================================================
  readonly odontologos = signal<OdontologoResponse[]>([]);
  readonly misCitas = signal<CitaResponse[]>([]);
  readonly servicios = signal<ServicioResponse[]>([]);
  readonly horasDisponibles = signal<string[]>([]);
  readonly horaSeleccionada = signal<string | null>(null);

  readonly isLoading = signal(true);
  readonly isLoadingHoras = signal(false);
  readonly isSaving = signal(false);
  readonly showReservaForm = signal(false);
  readonly activeTab = signal<'odontologos' | 'historial' | 'reservar' | 'comentar'>('odontologos');

  readonly fechaMinima = signal(new Date().toISOString().split('T')[0]);

  /** Computed: Historial completadas + reservadas */
  readonly historialCitas = computed(() =>
    this.misCitas().filter(c => c.estado === 'COMPLETADA' || c.estado === 'RESERVADA')
  );

  /** Computed: Total a pagar de servicios completados */
  readonly totalDeuda = computed(() =>
    this.misCitas()
      .filter(c => c.estado === 'COMPLETADA')
      .reduce((sum, c) => sum + (c.servicio?.precio || 0), 0)
  );

  /** Computed: Servicios realizados agrupados */
  readonly serviciosRealizados = computed(() => {
    const completadas = this.misCitas().filter(c => c.estado === 'COMPLETADA');
    return completadas.map(c => ({
      fecha: c.fecha,
      servicio: c.servicio?.nombre || 'Sin definir',
      odontologo: `${c.dentista.nombre} ${c.dentista.apellido}`,
      precio: c.servicio?.precio || 0
    }));
  });

  // ============================================================
  // Form
  // ============================================================
  readonly citaForm: FormGroup = this.fb.group({
    odontologoId: [null as number | null, [Validators.required]],
    servicioId: [null as number | null, [Validators.required]],
    fecha: ['', [Validators.required]]
  });

  readonly testimonioForm: FormGroup = this.fb.group({
    servicio: ['', [Validators.required]],
    estrellas: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    comentario: ['', [Validators.required, Validators.minLength(10)]]
  });

  // ============================================================
  // Lifecycle
  // ============================================================
  ngOnInit(): void {
    this._cargarDatos();
  }

  // ============================================================
  // Tabs
  // ============================================================
  cambiarTab(tab: 'odontologos' | 'historial' | 'reservar' | 'comentar'): void {
    this.activeTab.set(tab);
    if (tab === 'reservar') {
      this.showReservaForm.set(true);
    }
  }

  // ============================================================
  // Disponibilidad
  // ============================================================
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

  // ============================================================
  // Reservar
  // ============================================================
  reservar(): void {
    const hora = this.horaSeleccionada();
    if (this.citaForm.invalid || !hora) {
      this.citaForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);

    // Usar paciente ID 1 por defecto para usuario demo
    const request = {
      paciente: { id: 1 },
      dentista: { id: this.citaForm.get('odontologoId')?.value },
      servicio: { id: this.citaForm.get('servicioId')?.value },
      fecha: this.citaForm.get('fecha')?.value,
      hora: hora
    };

    this.clinicaService.crearCita(request).subscribe({
      next: (cita) => {
        this.notificationService.success(
          'Cita Reservada',
          `Cita agendada para ${cita.fecha} a las ${cita.hora}`
        );
        this.citaForm.reset();
        this.horasDisponibles.set([]);
        this.horaSeleccionada.set(null);
        this.showReservaForm.set(false);
        this.activeTab.set('historial');
        this._cargarCitas();
        this.isSaving.set(false);
      },
      error: () => {
        this.notificationService.error('Error', 'No se pudo reservar la cita');
        this.isSaving.set(false);
      }
    });
  }

  cancelarMiCita(cita: CitaResponse): void {
    if (!confirm(`¿Cancelar tu cita del ${cita.fecha} a las ${cita.hora}?`)) return;

    this.clinicaService.cancelarCita(cita.id).subscribe({
      next: () => {
        this.notificationService.success('Cita Cancelada', 'Tu cita fue cancelada exitosamente');
        this._cargarCitas();
      }
    });
  }

  // ============================================================
  // Testimonio
  // ============================================================
  enviarTestimonio(): void {
    if (this.testimonioForm.invalid) {
      this.testimonioForm.markAllAsTouched();
      return;
    }

    const val = this.testimonioForm.value;
    const autor = this.authService.user()?.displayName || 'Paciente Anónimo';

    this.testimonioService.agregar({
      autor,
      comentario: val.comentario,
      estrellas: val.estrellas,
      servicio: val.servicio
    });

    this.notificationService.success('¡Gracias!', 'Tu comentario ha sido publicado en la página de inicio.');
    this.testimonioForm.reset({ estrellas: 5 });
    this.cambiarTab('historial');
  }

  // ============================================================
  // Helper: Stars
  // ============================================================
  getEstrellas(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

  // ============================================================
  // Carga de datos
  // ============================================================
  private _cargarDatos(): void {
    this.isLoading.set(true);

    this.clinicaService.getOdontologos().subscribe({
      next: (data) => this.odontologos.set(data),
      error: () => this.odontologos.set([])
    });

    this.clinicaService.getServicios().subscribe({
      next: (data) => this.servicios.set(data),
      error: () => this.servicios.set([])
    });

    this._cargarCitas();
  }

  private _cargarCitas(): void {
    this.clinicaService.getCitas().subscribe({
      next: (data) => {
        this.misCitas.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.misCitas.set([]);
        this.isLoading.set(false);
      }
    });
  }
}
