import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicaService } from '../../../core/services/clinica.service';
import { ServicioResponse } from '../../../shared/models/models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './servicios.component.html'
})
export class ServiciosComponent implements OnInit {
  private readonly clinicaService = inject(ClinicaService);

  readonly servicios = signal<ServicioResponse[]>([]);
  readonly isLoading = signal(true);

  ngOnInit(): void {
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
