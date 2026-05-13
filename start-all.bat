@echo off
REM ========================================
REM Script MAESTRO para iniciar todo
REM OdontoCare - Clínica Dental
REM ========================================

echo.
echo ╔═══════════════════════════════════════════╗
echo ║   OdontoCare - Sistema Completo           ║
echo ║   Backend + Frontend                      ║
echo ╚═══════════════════════════════════════════╝
echo.

REM Obtener ruta del directorio actual
set ROOT_DIR=%~dp0

echo Iniciando servicios...
echo.

REM Iniciar Backend en terminal separada
echo ✓ Backend en nueva ventana...
start "OdontoCare Backend - Puerto 8080" cmd /k "cd /d %ROOT_DIR%backend && java -jar target\odontologica-1.0.0.jar"

REM Esperar unos segundos a que el backend arranque
timeout /t 5 /nobreak

REM Iniciar Frontend en terminal separada
echo ✓ Frontend en nueva ventana...
start "OdontoCare Frontend - Puerto 4200" cmd /k "cd /d %ROOT_DIR%frontend && npm start"

echo.
echo ╔═══════════════════════════════════════════╗
echo ║   Servicios iniciando...                  ║
echo ║                                           ║
echo ║   Backend:  http://localhost:8080        ║
echo ║   Frontend: http://localhost:4200        ║
echo ║                                           ║
echo ║   Espera 20-30 segundos                  ║
echo ║   para que ambos servicios estén listos  ║
echo ╚═══════════════════════════════════════════╝
echo.
echo Credentials:
echo   - Admin:  admin / admin
echo   - User:   user / user
echo.
echo Las ventanas de las terminales se abrirán automáticamente
echo Cierra este CMD cuando hayas terminado
echo.

pause
