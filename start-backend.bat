@echo off
REM ========================================
REM Script para iniciar el Backend
REM OdontoCare - Clínica Dental
REM ========================================

echo.
echo ╔════════════════════════════════════════╗
echo ║   OdontoCare - Backend Startup         ║
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

REM Mostrar información
echo ✓ Iniciando servidor Spring Boot...
echo ✓ Puerto: 8080
echo ✓ Base de datos: H2 (memoria)
echo ✓ URL: http://localhost:4200
echo.
echo Espera 15-20 segundos a que el servidor esté listo
echo Luego abre tu navegador en http://localhost:4200
echo.
echo Credentials:
echo   - Admin: admin / admin
echo   - User: user / user
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

REM Iniciar el JAR
java -jar target\odontologica-1.0.0.jar

pause
