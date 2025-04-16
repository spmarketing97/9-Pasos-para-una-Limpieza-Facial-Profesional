@echo off
echo ================================================================
echo Iniciando Bot de Telegram para Limpieza Facial Profesional
echo ================================================================
echo.

REM Verificar si Python está instalado
python --version 2>NUL
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python no esta instalado. Por favor, ejecuta setup_bot.bat primero.
    pause
    exit /b 1
)

REM Verificar si el archivo del bot existe
if not exist telegram_bot.py (
    echo [ERROR] No se encuentra el archivo telegram_bot.py
    pause
    exit /b 1
)

REM Verificar si el archivo .env existe
if not exist .env (
    echo [ERROR] No se encuentra el archivo .env. Ejecuta setup_bot.bat primero.
    pause
    exit /b 1
)

echo [INFO] Iniciando el bot de Telegram...
echo [INFO] Presiona Ctrl+C para detener el bot.
echo.
python telegram_bot.py

pause 