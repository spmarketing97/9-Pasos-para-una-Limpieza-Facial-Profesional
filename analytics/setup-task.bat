@echo off
REM Script para configurar una tarea programada en Windows que ejecute el informe semanal
REM Este script debe ejecutarse como administrador

echo Configurando tarea programada para informe semanal...

REM Obtener la ruta actual
set SCRIPT_DIR=%~dp0
set PYTHON_PATH=python

REM Crear la tarea programada
schtasks /create /tn "9PasosLimpiezaFacial_InformeSemanal" /tr "%PYTHON_PATH% %SCRIPT_DIR%weekly-report-scheduler.py" /sc WEEKLY /d MON /st 09:00 /ru SYSTEM /f

if %ERRORLEVEL% EQU 0 (
    echo Tarea programada creada exitosamente.
    echo La tarea se ejecutara todos los Lunes a las 9:00 AM.
) else (
    echo Error al crear la tarea programada. Codigo de error: %ERRORLEVEL%
    echo Asegurate de ejecutar este script como administrador.
)

echo.
echo Para ejecutar el script inmediatamente, puedes usar:
echo python %SCRIPT_DIR%analytics-report.py --send-email

pause 