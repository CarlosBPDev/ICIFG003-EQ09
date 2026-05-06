import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClinicaService } from '../../services/clinica.service';
import { NotificationService } from '../../services/notification.service';
import { OdontologoResponse } from '../../models/models';

@Component({
  selector: 'app-odontologos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './odontologos.component.html'
})
export class OdontologosComponent implements OnInit {
  private readonly clinicaService = inject(ClinicaService);
  private readonly notificationService = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  readonly odontologos = signal<OdontologoResponse[]>([]);
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly showForm = signal(false);
  readonly editingId = signal<number | null>(null);

  readonly odontologoForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    rut: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(12)]],
    especialidad: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
  });

  ngOnInit(): void {
    this._cargarOdontologos();
  }

  abrirFormulario(odontologo?: OdontologoResponse): void {
    if (odontologo) {
      this.editingId.set(odontologo.id);
      this.odontologoForm.patchValue({
        nombre: odontologo.nombre,
        rut: odontologo.rut,
        especialidad: odontologo.especialidad
      });
    } else {
      this.editingId.set(null);
      this.odontologoForm.reset();
    }
    this.showForm.set(true);
  }

  cerrarFormulario(): void {
    this.showForm.set(false);
    this.editingId.set(null);
    this.odontologoForm.reset();
  }

  guardar(): void {
    if (this.odontologoForm.invalid) {
      this.odontologoForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    const data = this.odontologoForm.value;
    const id = this.editingId();

    const request$ = id
      ? this.clinicaService.actualizarOdontologo(id, data)
      : this.clinicaService.crearOdontologo(data);

    request$.subscribe({
      next: () => {
        this.notificationService.success(
          id ? 'Odontólogo Actualizado' : 'Odontólogo Creado',
          `El odontólogo ${data.nombre} fue ${id ? 'actualizado' : 'registrado'} exitosamente`
        );
        this.cerrarFormulario();
        this._cargarOdontologos();
        this.isSaving.set(false);
      },
      error: () => {
        this.isSaving.set(false);
      }
    });
  }

  desactivar(odontologo: OdontologoResponse): void {
    if (!confirm(`¿Está seguro de desactivar al odontólogo ${odontologo.nombre}?`)) return;

    this.clinicaService.desactivarOdontologo(odontologo.id).subscribe({
      next: () => {
        this.notificationService.success('Odontólogo Desactivado', `${odontologo.nombre} fue desactivado`);
        this._cargarOdontologos();
      }
    });
  }

  private _cargarOdontologos(): void {
    this.isLoading.set(true);
    this.clinicaService.getOdontologos().subscribe({
      next: (data) => {
        this.odontologos.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.odontologos.set([]);
        this.isLoading.set(false);
      }
    });
  }
}
