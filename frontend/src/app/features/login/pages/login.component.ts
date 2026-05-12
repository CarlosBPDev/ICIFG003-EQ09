import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';
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
  private readonly authService = inject(AuthService);

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

    const usuario = (this.loginForm.get('usuario')?.value || '').trim();
    const password = (this.loginForm.get('password')?.value || '').trim();
    const recordarme = this.loginForm.get('recordarme')?.value;

    const success = this.authService.login(usuario, password);

    if (success) {
      if (recordarme) {
        localStorage.setItem('usuario_guardado', usuario);
      } else {
        localStorage.removeItem('usuario_guardado');
      }

      const role = this.authService.role();
      if (role === 'admin') {
        this.notificationService.success('¡Bienvenido, Administrador!', 'Acceso al panel de gestión');
        this.router.navigate(['/dashboard']);
      } else {
        this.notificationService.success('¡Bienvenido, Paciente!', 'Acceso a tu portal de salud');
        this.router.navigate(['/mi-portal']);
      }
    } else {
      this.notificationService.error('Credenciales inválidas', 'Prueba: admin/admin ó user/user');
      this.loginForm.get('password')?.reset();
    }

    this.isLoading.set(false);
  }
}
