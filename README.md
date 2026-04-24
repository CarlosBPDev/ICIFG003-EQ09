# 🏥 Clínica Odontológica - Taller 2

Este proyecto es una aplicación full-stack para la gestión de una clínica odontológica, desarrollada para el Taller 2 de Programación Avanzada.

## 🚀 Estructura del Proyecto

El repositorio está organizado en dos carpetas principales:

- `backend/`: API REST desarrollada con **Spring Boot 3**, Spring Data JPA y PostgreSQL.
- `frontend/`: Aplicación web desarrollada con **Angular 18**, Bootstrap 5 e iconos de Bootstrap.

## 📋 Requisitos Previos

- Java 17 o superior.
- Node.js 18 o superior y npm.
- PostgreSQL en ejecución (puerto por defecto 5432).

## 🛠️ Configuración y Ejecución

### 1. Base de Datos
Cree una base de datos en PostgreSQL llamada `clinica_odontologica`.
El backend está configurado para conectarse con:
- URL: `jdbc:postgresql://localhost:5432/clinica_odontologica`
- Usuario: `postgres`
- Contraseña: `postgres`

### 2. Backend (Spring Boot)
Navegue a la carpeta `backend/` y ejecute:
```bash
./mvnw spring-boot:run
```
La API estará disponible en `http://localhost:8080`.

### 3. Frontend (Angular)
Navegue a la carpeta `frontend/` y ejecute:
```bash
npm install
ng serve
```
Acceda a la aplicación en `http://localhost:4200`.

## ✨ Funcionalidades

- **Landing Page**: Presentación de la clínica, servicios y equipo.
- **Login**: Sistema de acceso (simulado para este taller).
- **CRUDs Individuales**:
  - Gestión de Pacientes.
  - Gestión de Dentistas.
  - Gestión de Servicios.
  - Gestión de Horarios.
- **Funcionalidades de Negocio**:
  - Reservar Hora (valida disponibilidad).
  - Cancelar Hora (libera el cupo).
  - Consultar Disponibilidad en tiempo real.

## 👥 Equipo
- **Repositorio**: [CarlosBPDev/ICIFG003-EQ09](https://github.com/CarlosBPDev/ICIFG003-EQ09)
- **Fecha**: 13 de Mayo, 2026
