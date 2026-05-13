@echo off
REM ========================================
REM Script para iniciar el Frontend
REM OdontoCare - Clínica Dental
REM ========================================

echo.
echo ╔════════════════════════════════════════╗
echo ║   OdontoCare - Frontend Startup        ║
echo ╚════════════════════════════════════════╝
echo.

REM Navegar al directorio del frontend
cd /d "%~dp0frontend"

REM Verificar que exista node_modules
if not exist "node_modules" (
    echo.
    echo ❌ ERROR: node_modules no encontrado
    echo Por favor ejecuta: npm install
    echo.
    pause
    exit /b 1
)

REM Mostrar información
echo ✓ Iniciando Angular dev server...
echo ✓ Puerto: 4200
echo ✓ URL: http://localhost:4200
echo.
echo El navegador se abrirá automáticamente
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

REM Iniciar el servidor de desarrollo
npm start

pause
