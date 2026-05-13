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
echo ✓ Insertando datos iniciales...
echo.
echo Los siguientes datos se insertarán automáticamente:
echo   - 5 Servicios (Consulta General, Limpieza, etc)
echo   - Pacientes de prueba (opcional)
echo   - Odontólogos de prueba (opcional)
echo.
echo ℹ️  Para acceder a H2 Console mientras el servidor esté activo:
echo   http://localhost:8080/h2-console
echo.
echo Para insertar DATOS ADICIONALES manualmente:
echo   1. Abre http://localhost:8080/h2-console
echo   2. Database: jdbc:h2:mem:clinica_db
echo   3. Username: sa (sin contraseña)
echo   4. Ejecuta tus INSERT statements
echo.
echo Presiona Ctrl+C cuando hayas terminado
echo.

REM Iniciar el JAR (inserta datos automáticamente)
java -jar target\odontologica-1.0.0.jar

pause
