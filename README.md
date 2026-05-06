# Clínica Odontológica "OdontoCare"

Este proyecto cumple íntegramente con los requisitos establecidos para la asignatura:
- **Solamente 2 carpetas principales**: `backend` y `frontend`.
- **Backend en Spring Boot**.
- **Frontend en Angular**.
- Conserva el **Diseño Original (HTML/CSS/JS)** creado por el equipo (colores, banner, login con animación).
- **1 Funcionalidad de Negocio como Equipo**: Gestión de Citas (Reservar, Cancelar, Chequear Disponibilidad).
- **2 CRUDs (1 por alumno)**: Gestión de Pacientes y Gestión de Odontólogos.
- Landing page, Login y Menú principal.

## Estructura del Proyecto

```
/
├── backend/    # API REST en Spring Boot 3.x (Java 17)
├── frontend/   # SPA en Angular 18 con Signals y Rutas Protegidas
└── README.md   # Instrucciones detalladas de ejecución
```

## Requisitos Previos

- **Java 17** o superior
- **Maven**
- **Node.js** v18 o superior
- **Angular CLI** v18
- **PostgreSQL** v14 o superior

---

## Instrucciones para Ejecutar el Backend (Spring Boot)

1. **Base de Datos**: 
   Asegúrate de tener PostgreSQL en ejecución. Crea una base de datos llamada `clinica_odontologica`.
   Puedes hacerlo conectándote a postgres y ejecutando:
   ```sql
   CREATE DATABASE clinica_odontologica;
   ```
   (El usuario por defecto configurado es `postgres` con contraseña `postgres`. Si tienes otra, modifica el archivo `backend/src/main/resources/application.properties`).

2. **Compilar y Ejecutar**:
   Abre una terminal en la carpeta `backend` y ejecuta:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   El servidor iniciará en `http://localhost:8080`.

---

## Instrucciones para Ejecutar el Frontend (Angular)

1. **Instalar Dependencias**:
   Abre una nueva terminal en la carpeta `frontend` y ejecuta:
   ```bash
   cd frontend
   npm install
   ```

2. **Levantar el Servidor de Desarrollo**:
   Una vez instaladas las dependencias, ejecuta:
   ```bash
   ng serve
   ```
   Abre tu navegador y dirígete a `http://localhost:4200`.

## Uso del Sistema

- **Página de Inicio**: Verás la Landing Page con el diseño original y un carrusel de servicios.
- **Login**: Haz clic en "Iniciar Sesión". El sistema tiene un login de prueba:
  - Usuario: `Blas`
  - Contraseña: `123`
- **Dashboard**: Al ingresar, podrás acceder al menú protegido (Pacientes, Odontólogos y Citas).
- **CRUDs**: Podrás crear, editar, listar y desactivar Pacientes y Odontólogos.
- **Citas**: Podrás chequear la disponibilidad de horas de un odontólogo específico y reservar o cancelar tu cita.
