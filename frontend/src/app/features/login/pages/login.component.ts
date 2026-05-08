import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['../../../../assets/css/login.css']
})
export class LoginComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly notificationService = inject(NotificationService);

  readonly isLoading = signal(false);

  readonly loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required]],
    recordarme: [false]
  });

  ngOnInit() {
    // Recuperar credenciales guardadas si existen
    const usuarioGuardado = localStorage.getItem('usuario_guardado');
    if (usuarioGuardado) {
      this.loginForm.patchValue({
        usuario: usuarioGuardado,
        recordarme: true
      });
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const { usuario, password, recordarme } = this.loginForm.value;

    // Simulación de autenticación (en producción, llamaría a un servicio)
    setTimeout(() => {
      // Validar credenciales de prueba
      if (usuario === 'admin' && password === 'admin') {
        // Guardar sesión del usuario (requerido por el authGuard)
        localStorage.setItem('clinica_usuario', usuario);

        // Guardar usuario si se seleccionó recordarme
        if (recordarme) {
          localStorage.setItem('usuario_guardado', usuario);
        } else {
          localStorage.removeItem('usuario_guardado');
        }

        this.notificationService.success(`¡Bienvenido, ${usuario}!`, 'Sesión iniciada correctamente');
        this.router.navigate(['/dashboard']);
      } else {
        this.notificationService.error('Credenciales inválidas', 'Usuario o contraseña incorrectos. Prueba: admin / admin');
        this.loginForm.get('password')?.reset();
      }

      this.isLoading.set(false);
    }, 1500);
  }
}
