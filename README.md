# 🦷 Clínica Odontológica "OdontoCare"

**Sistema de Gestión Integral para Clínicas Odontológicas**

> Aplicación Full Stack con Backend REST en Spring Boot 3.x y Frontend SPA en Angular 18 con arquitectura modular escalable.

---

##  Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

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

## 🚀 INICIO RÁPIDO: Desde 0 hasta Ejecutando

### Paso 0️⃣: Clonar el Repositorio

```bash
# Clonar el proyecto
git clone https://github.com/tu-usuario/ICIFG003-EQ09.git

# Entrar en la carpeta del proyecto
cd ICIFG003-EQ09
```

> Si es la primera vez, también puedes descargar el ZIP directamente desde GitHub.

---

### Paso 1️⃣: Configurar la Base de Datos PostgreSQL

#### Opción A: Usando pgAdmin (GUI - Recomendado)

1. Abre **pgAdmin** (incluido con PostgreSQL)
2. Haz clic derecho en **Databases** → **Create** → **Database**
3. Escribe el nombre: `clinica_odontologica`
4. Haz clic en **Save**

#### Opción B: Usando Terminal/CMD

```bash
# Conectar a PostgreSQL (ingresa tu contraseña)
psql -U postgres

# Crear la base de datos
CREATE DATABASE clinica_odontologica;

# Salir
\q
```

#### ⚙️ Configurar Credenciales (si son diferentes)

Si tu usuario PostgreSQL o contraseña es diferente a `postgres:postgres`, edita:

📄 **`backend/src/main/resources/application.properties`**

```properties
# Actualiza estos valores
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
spring.datasource.url=jdbc:postgresql://localhost:5432/clinica_odontologica
```

---

### Paso 2️⃣: Ejecutar el Backend (Terminal 1)

```bash
# Navegar a la carpeta backend
cd backend

# Compilar e instalar dependencias
mvn clean install

# Ejecutar la aplicación
mvn spring-boot:run
```

**Esperado:**
```
✅ Backend iniciado en: http://localhost:8080
```

> Si ves errores de conexión BD, verifica que PostgreSQL esté corriendo y que los datos de conexión en `application.properties` sean correctos.

---

### Paso 3️⃣: Ejecutar el Frontend (Terminal 2 - Nueva)

```bash
# Navegar a la carpeta frontend (desde raíz del proyecto)
cd frontend

# Instalar dependencias npm
npm install

# Iniciar servidor de desarrollo
ng serve
```

**Esperado:**
```
✅ Frontend listo en: http://localhost:4200
```

> Abre tu navegador en `http://localhost:4200` automáticamente (o hazlo manualmente)

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

### Características Frontend

- ✨ **Standalone Components** - Sin módulos NgModule
- 🎯 **Signals & Computed** - Reactividad moderna
- 🔒 **Route Guards** - AuthGuard en rutas protegidas
- 🌐 **Lazy Loading** - Carga bajo demanda de componentes
- 💬 **Toast Notifications** - Sistema de notificaciones
- 📱 **Diseño Responsivo** - Mobile-friendly
- 🎭 **Animaciones CSS** - Login con efectos suaves

---

## 🐛 Solución de Problemas

### ❌ "Error: Cannot connect to database"
```
✅ Solución:
1. Verifica que PostgreSQL esté running
2. Comprueba que la BD 'clinica_odontologica' existe
3. Verifica usuario/contraseña en application.properties
4. Reinicia PostgreSQL
```

### ❌ "Error: Port 8080 already in use"
```
✅ Solución (Windows):
netstat -ano | findstr :8080
taskkill /PID <PID> /F

✅ Solución (Mac/Linux):
lsof -i :8080
kill -9 <PID>
```

### ❌ "Error: Port 4200 already in use"
```
✅ Solución:
ng serve --port 4201
```

### ❌ "npm ERR! 404 Not Found"
```
✅ Solución:
rm -rf node_modules package-lock.json
npm install
```

### ❌ "Login no funciona"
```
✅ Verificar:
1. Backend esté corriendo (http://localhost:8080)
2. Usa credentials de prueba: Blas / 123
3. Revisa la consola del navegador (F12 → Console)
```

---

## 📚 Tecnologías Utilizadas

### Backend
- **Spring Boot 3.x** - Framework REST
- **Java 17** - Lenguaje
- **Maven** - Gestor de dependencias
- **PostgreSQL** - Base de datos
- **JPA/Hibernate** - ORM
- **Lombok** - Reduce boilerplate

### Frontend
- **Angular 18** - Framework SPA
- **TypeScript** - Lenguaje
- **Bootstrap/CSS** - Estilos
- **RxJS** - Programación reactiva
- **Angular Signals** - Estado reactivo
- **Standalone API** - Arquitectura moderna

---

## 👥 Equipo

- **Backend**: Spring Boot REST API
- **Frontend**: Angular SPA con Signals
- **Base de Datos**: PostgreSQL
- **Diseño**: HTML/CSS/JS Original

---

## 📝 Notas Importantes

1. **Credenciales de Prueba**: Usuario `Blas`, Contraseña `123`
2. **Puerto Backend**: 8080
3. **Puerto Frontend**: 4200
4. **BD**: `clinica_odontologica` en PostgreSQL
5. **Usuario BD Default**: `postgres` / `postgres`

---

## 📞 Soporte

Si encuentras problemas:

1. **Revisa logs**:
   - Backend: Terminal donde corre `mvn spring-boot:run`
   - Frontend: Consola del navegador (F12)

2. **Limpia caché**:
   ```bash
   # Backend
   mvn clean
   
   # Frontend
   rm -rf node_modules dist
   npm install
   ```

3. **Reinicia servicios**: PostgreSQL → Backend → Frontend

---

## 📄 Licencia

Este proyecto es para fines educativos.

---

**¡Listo! 🎉 El sistema está completamente configurado. Disfruta del proyecto.**
