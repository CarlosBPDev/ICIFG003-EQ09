import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClinicaService } from '../../services/clinica.service';
import { NotificationService } from '../../services/notification.service';
import { PacienteResponse } from '../../models/models';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pacientes.component.html'
})
export class PacientesComponent implements OnInit {
  private readonly clinicaService = inject(ClinicaService);
  private readonly notificationService = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  readonly pacientes = signal<PacienteResponse[]>([]);
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly showForm = signal(false);
  readonly editingId = signal<number | null>(null);

  readonly pacienteForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    rut: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(12)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.maxLength(20)]]
  });

  ngOnInit(): void {
    this._cargarPacientes();
  }

  abrirFormulario(paciente?: PacienteResponse): void {
    if (paciente) {
      this.editingId.set(paciente.id);
      this.pacienteForm.patchValue({
        nombre: paciente.nombre,
        rut: paciente.rut,
        email: paciente.email,
        telefono: paciente.telefono || ''
      });
    } else {
      this.editingId.set(null);
      this.pacienteForm.reset();
    }
    this.showForm.set(true);
  }

  cerrarFormulario(): void {
    this.showForm.set(false);
    this.editingId.set(null);
    this.pacienteForm.reset();
  }

  guardar(): void {
    if (this.pacienteForm.invalid) {
      this.pacienteForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    const data = this.pacienteForm.value;
    const id = this.editingId();

    const request$ = id
      ? this.clinicaService.actualizarPaciente(id, data)
      : this.clinicaService.crearPaciente(data);

    request$.subscribe({
      next: () => {
        this.notificationService.success(
          id ? 'Paciente Actualizado' : 'Paciente Creado',
          `El paciente ${data.nombre} fue ${id ? 'actualizado' : 'registrado'} exitosamente`
        );
        this.cerrarFormulario();
        this._cargarPacientes();
        this.isSaving.set(false);
      },
      error: () => {
        this.isSaving.set(false);
      }
    });
  }

  desactivar(paciente: PacienteResponse): void {
    if (!confirm(`¿Está seguro de desactivar al paciente ${paciente.nombre}?`)) return;

    this.clinicaService.desactivarPaciente(paciente.id).subscribe({
      next: () => {
        this.notificationService.success('Paciente Desactivado', `${paciente.nombre} fue desactivado`);
        this._cargarPacientes();
      }
    });
  }

  private _cargarPacientes(): void {
    this.isLoading.set(true);
    this.clinicaService.getPacientes().subscribe({
      next: (data) => {
        this.pacientes.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.pacientes.set([]);
        this.isLoading.set(false);
      }
    });
  }
}
