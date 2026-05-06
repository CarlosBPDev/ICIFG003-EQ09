import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/css/login.css']
})
export class LoginComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly notificationService = inject(NotificationService);

  readonly isLoading = signal(false);

  readonly loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  ngOnInit() {
    // Ported from login.js
    const T_EXPANSION = 800;          
    const T_ROTACION_ENTRADA = 700;   
    const T_ESPERA_LOGO = 800;        
    const T_ROTACION_SALIDA = 600;

    const esperar = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const iniciarSecuencia = async () => {
      try {
        const contenedorLogo = document.querySelector('.contenedor-logo');
        const pantallaInicial = document.querySelector('.pantalla-inicial');
        const contenedorLogin = document.querySelector('.contenedor-login');

        if (!contenedorLogo || !pantallaInicial || !contenedorLogin) return;

        // Ocultar login inicialmente como en el original
        contenedorLogin.classList.add('oculto');

        await esperar(T_EXPANSION); 
        contenedorLogo.classList.add('mostrar-logo');
        await esperar(T_ROTACION_ENTRADA + T_ESPERA_LOGO);
        contenedorLogo.classList.remove('mostrar-logo'); 
        contenedorLogo.classList.add('desvanecer'); 
        await esperar(T_ROTACION_SALIDA);
        
        contenedorLogo.classList.add('ocultar-final'); 
        pantallaInicial.classList.add('ocultar-fondo-blanco');
        contenedorLogin.classList.remove('oculto'); 
        contenedorLogin.classList.add('visible'); 
      } catch (error) {
        console.error("Error durante la secuencia de animación:", error);
      }
    };
    
    iniciarSecuencia();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    setTimeout(() => {
      const { usuario, password } = this.loginForm.value;

      // Login simulado original: Usuario: Blas, Contraseña: 123
      if (usuario.toLowerCase() === 'blas' && password === '123') {
        localStorage.setItem('clinica_usuario', usuario);
        this.notificationService.success('Bienvenido', `Sesión iniciada como ${usuario}`);
        this.router.navigate(['/dashboard']); // O al componente correspondiente
      } else {
        this.notificationService.error('Error de Acceso', 'Usuario o contraseña incorrectos. Usuario: Blas | Contraseña: 123');
      }

      this.isLoading.set(false);
    }, 600);
  }
}
