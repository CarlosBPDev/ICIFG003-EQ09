@echo off
REM ========================================
REM Script para CREAR la Base de Datos
REM OdontoCare - Clínica Dental
REM ========================================

echo.
echo ╔════════════════════════════════════════╗
echo ║   OdontoCare - Crear Base de Datos     ║
echo ╚════════════════════════════════════════╝
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
echo ✓ Creando estructura de base de datos
echo.
echo Las tablas se crearán automáticamente al iniciar:
echo   - pacientes
echo   - dentistas
echo   - servicios
echo   - citas
echo   - horarios_disponibles
echo.
echo Presiona Ctrl+C cuando veas:
echo   "Tomcat started on port(s): 8080"
echo.

REM Iniciar el JAR (esto crea las tablas)
java -jar target\odontologica-1.0.0.jar

pause
