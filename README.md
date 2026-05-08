# 🦷 Clínica Odontológica "OdontoCare"

**Sistema de Gestión Integral para Clínicas Odontológicas**

> Aplicación Full Stack con Backend REST en Spring Boot 3.x y Frontend SPA en Angular 18 con arquitectura modular escalable.

---

##  Requisitos Previos

Antes de comenzar, **debes tener instalado**:

| Requisito | Versión | Link |
|-----------|---------|------|
| **Java JDK** | 17+ | [Descargar](https://adoptium.net/) |
| **Maven** | 3.8+ | [Descargar](https://maven.apache.org/download.cgi) |
| **Node.js** | 18+ | [Descargar](https://nodejs.org/) |
| **npm** | 9+ | Incluido con Node.js |
| **PostgreSQL** | 14+ | [Descargar](https://www.postgresql.org/download/) |
| **Git** | Último | [Descargar](https://git-scm.com/) |

### ✅ Verificar Instalaciones

```bash
# Verificar Java
java -version

# Verificar Maven
mvn -version

# Verificar Node.js y npm
node --version
npm --version

# Verificar PostgreSQL (después de instalar)
psql --version
```

---

## 🚀 INICIO RÁPIDO: 4 Pasos para Arrancar

> ⏱️ **Tiempo total: ~5-10 minutos** (depende de descargas)

---

### ✅ Paso 1: Clonar / Descargar el Proyecto

**Opción A: Git (Recomendado)**
```bash
git clone https://github.com/tu-usuario/ICIFG003-EQ09.git
cd ICIFG003-EQ09
```

**Opción B: Descargar ZIP**
- Ir a GitHub → Code → Download ZIP
- Extraer en tu carpeta

---

### ✅ Paso 2: Configurar Base de Datos (Una sola vez)

Abre tu **terminal/CMD** y ejecuta:

```bash
# Conectar a PostgreSQL (ingresa tu contraseña)
psql -U postgres

# Crear la base de datos
CREATE DATABASE clinica_odontologica;

# Salir
\q
```

**⚠️ Si tus credenciales de PostgreSQL NO son `postgres:postgres`:**

Edita este archivo:
```
backend/src/main/resources/application.properties
```

Cambia estas líneas:
```properties
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_CONTRASEÑA
```

---

### ✅ Paso 3: Ejecutar el Backend

Abre una **terminal en `backend/`** y ejecuta:

```bash
mvn clean install
mvn spring-boot:run
```

**Si funciona verás:**
```
✅ Tomcat started on port(s): 8080
✅ http://localhost:8080
```

**❌ Si falla:**
- ✓ PostgreSQL está corriendo?
- ✓ Base de datos `clinica_odontologica` existe?
- ✓ Credenciales correctas en `application.properties`?

---

### ✅ Paso 4: Ejecutar el Frontend

Abre una **NUEVA terminal en `frontend/`** y ejecuta:

```bash
npm install
ng serve
```

**Si funciona verás:**
```
✅ Application bundle generation complete
✅ http://localhost:4200
```

Abre automáticamente en navegador o ve a: **http://localhost:4200**

---

### 🎯 Login para Probar

Credenciales por defecto:
```
Usuario: Blas
Contraseña: 123
```

**¡Listo! 🎉 El proyecto está corriendo.**

---

## � Descripción del Proyecto

Este proyecto cumple íntegramente con los requisitos establecidos para la asignatura:

- ✅ **Arquitectura Modular**: 2 carpetas principales (`backend` y `frontend`)
- ✅ **Backend REST**: Spring Boot 3.x con Java 17 + PostgreSQL
- ✅ **Frontend Moderno**: Angular 18 con Signals y Rutas Protegidas
- ✅ **Diseño Premium**: HTML/CSS/JS original con animaciones personalizadas
- ✅ **Gestión de Citas**: Sistema de reservas con chequeo de disponibilidad
- ✅ **2 CRUDs**: Pacientes y Odontólogos (CRUD completo)
- ✅ **Autenticación**: Login con sesiones protegidas
- ✅ **Landing Page + Dashboard**: Interfaz profesional

---

## 🏗️ Estructura del Proyecto

```
ICIFG003-EQ09/
├── backend/                    # 🔧 API REST Spring Boot
│   ├── src/main/java/         # Código fuente Java
│   ├── src/main/resources/    # Configuración (BD, properties)
│   └── pom.xml               # Dependencias Maven
│
├── frontend/                   # 🎨 SPA Angular 18
│   ├── src/app/              # Aplicación modular
│   │   ├── core/             # Servicios, guards, interceptors
│   │   ├── shared/           # Modelos compartidos
│   │   ├── features/         # Módulos de funcionalidades
│   │   └── app.config.ts     # Configuración standalone
│   ├── package.json          # Dependencias npm
│   └── angular.json          # Config Angular
│
└── README.md                  # Este archivo
```

---

### 🏠 Página de Inicio (Landing Page)
- Vista principal con banner profesional
- Carrusel de servicios
- Información sobre la clínica
- Botón "Agendar Cita"

### 🔐 Login
**Credenciales de Prueba:**
```
Usuario: Blas
Contraseña: 123
```

**Nota:** El sistema almacena la sesión en localStorage. Cierra sesión desde el botón en la navbar.

### 📊 Dashboard (Protegido)
Acceso a:
- 👥 **Gestión de Pacientes** - CRUD completo
- 🦷 **Gestión de Odontólogos** - CRUD completo
- 📅 **Gestión de Citas** - Reservar, cancelar, chequear disponibilidad

### 👤 Gestión de Pacientes
```
✅ Crear paciente (nombre, RUT, email, teléfono)
✅ Editar información existente
✅ Listar todos los pacientes
✅ Desactivar paciente
```

### 🦷 Gestión de Odontólogos
```
✅ Crear odontólogo (nombre, RUT, especialidad)
✅ Editar información existente
✅ Listar todos los odontólogos
✅ Desactivar odontólogo
```

### 📅 Gestión de Citas
```
✅ Seleccionar odontólogo
✅ Ver horas disponibles
✅ Reservar cita en hora disponible
✅ Cancelar cita (solo el día de)
✅ Ver historial de citas
```

---

## 🛠️ Detalle: Backend (Spring Boot)

### Estructura Backend

```
backend/src/main/java/com/clinica/odontologica/
├── ClinicaApplication.java       # Punto de entrada
├── config/                       # Configuración CORS
├── controller/                   # Endpoints REST
├── model/                        # Entidades JPA
├── repository/                   # Acceso a datos
└── service/                      # Lógica de negocio
```

### Endpoints Principales

**Pacientes:**
```
GET    /api/v1/pacientes          → Listar todos
GET    /api/v1/pacientes/{id}     → Obtener por ID
POST   /api/v1/pacientes          → Crear
PUT    /api/v1/pacientes/{id}     → Actualizar
PATCH  /api/v1/pacientes/{id}/desactivar → Desactivar
```

**Odontólogos:**
```
GET    /api/v1/odontologos        → Listar todos
GET    /api/v1/odontologos/{id}   → Obtener por ID
POST   /api/v1/odontologos        → Crear
PUT    /api/v1/odontologos/{id}   → Actualizar
PATCH  /api/v1/odontologos/{id}/desactivar → Desactivar
```

**Citas:**
```
GET    /api/v1/citas              → Listar todas
POST   /api/v1/citas              → Crear
DELETE /api/v1/citas/{id}         → Cancelar
GET    /api/v1/citas/disponibilidad → Chequear disponibilidad
```

### Documentación Swagger (Opcional)
```
http://localhost:8080/swagger-ui.html
```

---

## 🎨 Detalle: Frontend (Angular 18)

### Estructura Frontend (Modular)

```
src/app/
├── core/                    # Servicios centrales
│   ├── guards/             # AuthGuard (rutas protegidas)
│   ├── interceptors/       # Error interceptor
│   └── services/           # ClinicaService, NotificationService
│
├── shared/                  # Código compartido
│   ├── models/             # Interfaces TypeScript
│   └── components/         # Componentes reutilizables
│
├── features/               # Módulos de funcionalidades
│   ├── landing/pages/      # Landing page
│   ├── login/pages/        # Login page
│   ├── dashboard/pages/    # Dashboard
│   ├── personas/pages/     # Gestión de pacientes
│   ├── odontologos/pages/  # Gestión de odontólogos
│   └── citas/pages/        # Gestión de citas
│
├── app.config.ts           # Config standalone Angular
├── app.routes.ts           # Rutas (lazy loading)
└── app.component.ts        # Componente raíz
```

---

## 📝 Notas Importantes

1. **Credenciales de Prueba**: Usuario `Blas`, Contraseña `123`
2. **Puerto Backend**: 8080
3. **Puerto Frontend**: 4200
4. **BD**: `clinica_odontologica` en PostgreSQL
5. **Usuario BD Default**: `postgres` / `postgres`

---


