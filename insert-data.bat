@echo off
REM ========================================
REM Script para INSERTAR Datos en la BD
REM OdontoCare - Clínica Dental
REM ========================================

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║   OdontoCare - Insertar Datos en Base de Datos    ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM Navegar al directorio del backend
cd /d "%~dp0backend"

REM Verificar que exista el JAR
if not exist "target\odontologica-1.0.0.jar" (
    echo.
    echo ❌ ERROR: JAR no encontrado
    echo Por favor ejecuta: mvn clean package
    echo.
    pause
    exit /b 1
)

echo ✓ Iniciando servidor Spring Boot...
echo ✓ Insertando datos iniciales en la base de datos
echo.
echo Los siguientes datos se insertarán automáticamente:
echo   - 5 Servicios Odontológicos
echo   - Estructura de tablas
echo.
echo ℹ️  Base de datos: H2 (en memoria)
echo ℹ️  Puerto: 8080
echo.
echo Para acceder a la consola H2 mientras el servidor está activo:
echo   http://localhost:8080/h2-console
echo   Database: jdbc:h2:mem:clinica_db
echo   Username: sa (sin contraseña)
echo.
echo Presiona Ctrl+C cuando hayas terminado
echo.

REM Iniciar el JAR (inserta datos automáticamente)
java -jar target\odontologica-1.0.0.jar

pause
