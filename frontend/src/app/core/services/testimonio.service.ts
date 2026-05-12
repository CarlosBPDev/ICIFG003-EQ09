import { Injectable, signal, computed } from '@angular/core';

/**
 * Servicio para gestionar los testimonios/comentarios de la clínica.
 * Los datos se almacenan en localStorage para persistencia sin backend.
 */

export interface Testimonio {
  id: number;
  autor: string;
  comentario: string;
  estrellas: number;  // 1-5
  servicio: string;
}

const DEFAULT_TESTIMONIOS: Testimonio[] = [
  { id: 1, autor: 'Juan Pérez', comentario: 'Excelente atención y resultados. Muy recomendados.', estrellas: 5, servicio: 'Ortodoncia' },
  { id: 2, autor: 'Rosa López', comentario: 'Profesionales y amables. Me hicieron sentir muy cómoda.', estrellas: 4, servicio: 'Blanqueamiento' },
  { id: 3, autor: 'Luis Fernández', comentario: 'El tratamiento de implantes fue impecable.', estrellas: 5, servicio: 'Implantes Dentales' }
];

@Injectable({ providedIn: 'root' })
export class TestimonioService {

  private readonly _testimonios = signal<Testimonio[]>([]);
  private _nextId = 100;

  readonly testimonios = computed(() => this._testimonios());

  constructor() {
    this._cargar();
  }

  agregar(t: Omit<Testimonio, 'id'>): void {
    const nuevo: Testimonio = { ...t, id: this._nextId++ };
    this._testimonios.update(list => [...list, nuevo]);
    this._guardar();
  }

  eliminar(id: number): void {
    this._testimonios.update(list => list.filter(t => t.id !== id));
    this._guardar();
  }

  actualizar(t: Testimonio): void {
    this._testimonios.update(list => list.map(item => item.id === t.id ? t : item));
    this._guardar();
  }

  private _guardar(): void {
    localStorage.setItem('clinica_testimonios', JSON.stringify(this._testimonios()));
  }

  private _cargar(): void {
    try {
      const raw = localStorage.getItem('clinica_testimonios');
      if (raw) {
        const data: Testimonio[] = JSON.parse(raw);
        this._testimonios.set(data);
        this._nextId = Math.max(...data.map(t => t.id), 99) + 1;
      } else {
        this._testimonios.set(DEFAULT_TESTIMONIOS);
        this._guardar();
      }
    } catch {
      this._testimonios.set(DEFAULT_TESTIMONIOS);
    }
  }
}
