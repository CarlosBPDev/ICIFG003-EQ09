import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TestimonioService } from '../../../core/services/testimonio.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrls: ['../../../../assets/css/inicio.css']
})
export class LandingComponent {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  readonly testimonioService = inject(TestimonioService);

  scrollLeft(): void {
    if (this.carouselContainer) {
      this.carouselContainer.nativeElement.scrollBy({ left: -350, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.carouselContainer) {
      this.carouselContainer.nativeElement.scrollBy({ left: 350, behavior: 'smooth' });
    }
  }

  getEstrellas(n: number): string {
    return '⭐'.repeat(n);
  }
}
