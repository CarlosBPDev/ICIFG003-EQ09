import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClinicaService } from '../../../core/services/clinica.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ServicioResponse } from '../../../shared/models/models';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './servicios.component.html'
})
export class ServiciosComponent implements OnInit {
  private readonly clinicaService = inject(ClinicaService);
  private readonly notificationService = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  readonly servicios = signal<ServicioResponse[]>([]);
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly showForm = signal(false);
  readonly editingId = signal<number | null>(null);

  readonly servicioForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    descripcion: [''],
    duracionMinutos: [30, [Validators.required, Validators.min(15), Validators.max(480)]],
    precio: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void {
    this._cargarServicios();
  }

  abrirFormulario(servicio?: ServicioResponse): void {
    if (servicio) {
      this.editingId.set(servicio.id);
      this.servicioForm.patchValue({
        nombre: servicio.nombre,
        descripcion: servicio.descripcion || '',
        duracionMinutos: servicio.duracionMinutos,
        precio: servicio.precio
      });
    } else {
      this.editingId.set(null);
      this.servicioForm.reset({ duracionMinutos: 30, precio: 0 });
    }
    this.showForm.set(true);
  }

  cerrarFormulario(): void {
    this.showForm.set(false);
    this.editingId.set(null);
    this.servicioForm.reset({ duracionMinutos: 30, precio: 0 });
  }

  guardar(): void {
    if (this.servicioForm.invalid) {
      this.servicioForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    const data = this.servicioForm.value;
    const id = this.editingId();

    const request$ = id
      ? this.clinicaService.actualizarServicio(id, data)
      : this.clinicaService.crearServicio(data);

    request$.subscribe({
      next: () => {
        this.notificationService.success(
          id ? 'Servicio Actualizado' : 'Servicio Creado',
          `El servicio "${data.nombre}" fue ${id ? 'actualizado' : 'creado'} exitosamente`
        );
        this.cerrarFormulario();
        this._cargarServicios();
        this.isSaving.set(false);
      },
      error: () => {
        this.isSaving.set(false);
      }
    });
  }

  eliminar(servicio: ServicioResponse): void {
    if (!confirm(`¿Está seguro de eliminar el servicio "${servicio.nombre}"?`)) return;

    this.clinicaService.eliminarServicio(servicio.id).subscribe({
      next: () => {
        this.notificationService.success('Servicio Eliminado', `"${servicio.nombre}" fue eliminado`);
        this._cargarServicios();
      }
    });
  }

  private _cargarServicios(): void {
    this.isLoading.set(true);
    this.clinicaService.getServicios().subscribe({
      next: (data) => {
        this.servicios.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.servicios.set([]);
        this.isLoading.set(false);
      }
    });
  }
}
