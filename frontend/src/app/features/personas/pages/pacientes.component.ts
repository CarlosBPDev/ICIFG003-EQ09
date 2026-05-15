import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { ClinicaService } from '../../../core/services/clinica.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PacienteResponse } from '../../../shared/models/models';

// Validadores personalizados
const phoneValidator = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null;
  const phoneRegex = /^[0-9]*$/;
  return phoneRegex.test(control.value) ? null : { invalidPhone: true };
};

const rutValidator = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null;
  const rutRegex = /^[0-9]{7,11}-[0-9kK]$/;
  return rutRegex.test(control.value) ? null : { invalidRut: true };
};

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
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    rut: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(12), rutValidator]],
    email: ['', [Validators.email]],
    telefono: ['', [phoneValidator, Validators.maxLength(20)]],
    direccion: [''],
    fechaNacimiento: ['']
  });

  ngOnInit(): void {
    this._cargarPacientes();
  }

  abrirFormulario(paciente?: PacienteResponse): void {
    if (paciente) {
      this.editingId.set(paciente.id);
      this.pacienteForm.patchValue({
        nombre: paciente.nombre,
        apellido: paciente.apellido,
        rut: paciente.rut,
        email: paciente.email || '',
        telefono: paciente.telefono || '',
        direccion: paciente.direccion || '',
        fechaNacimiento: paciente.fechaNacimiento || ''
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
          `El paciente ${data.nombre} ${data.apellido} fue ${id ? 'actualizado' : 'registrado'} exitosamente`
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

  eliminar(paciente: PacienteResponse): void {
    if (!confirm(`¿Está seguro de eliminar al paciente ${paciente.nombre} ${paciente.apellido}?`)) return;

    this.clinicaService.eliminarPaciente(paciente.id).subscribe({
      next: () => {
        this.notificationService.success('Paciente Eliminado', `${paciente.nombre} ${paciente.apellido} fue eliminado`);
        this._cargarPacientes();
      },
      error: (error) => {
        const mensaje = error?.error?.mensaje || 'No se pudo eliminar el paciente. Intente nuevamente.';
        this.notificationService.error('Error al eliminar', mensaje);
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
