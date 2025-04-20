@echo off
REM Script para ejecutar el informe semanal con las credenciales de Google Analytics
echo Configurando informe semanal...

REM Establecer la ruta absoluta al archivo de credenciales
set CREDENTIALS_PATH=%~dp0analytics\credentials\credentials.json

REM Verificar si el archivo de credenciales existe
if not exist "%CREDENTIALS_PATH%" (
    echo ERROR: No se encontró el archivo de credenciales en:
    echo %CREDENTIALS_PATH%
    echo.
    echo Por favor, coloca el archivo credentials.json en la carpeta analytics/credentials/
    echo Consulta analytics/credentials/README.md para obtener instrucciones.
    pause
    exit /b 1
)

REM Configurar la variable de entorno para Google Analytics
set GOOGLE_APPLICATION_CREDENTIALS=%CREDENTIALS_PATH%
echo Variable de entorno configurada: GOOGLE_APPLICATION_CREDENTIALS=%GOOGLE_APPLICATION_CREDENTIALS%

REM Ejecutar el script de informe semanal
echo Ejecutando informe semanal...
python informe_semanal.py

REM Si hay un error, mostrar mensaje
if %ERRORLEVEL% neq 0 (
    echo ERROR: El informe semanal falló con código %ERRORLEVEL%
    pause
    exit /b %ERRORLEVEL%
)

echo Informe semanal completado correctamente.
pause 