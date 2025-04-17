@echo off
echo ================================================================
echo Configuracion del Bot de Telegram para Limpieza Facial Profesional
echo ================================================================
echo.

REM Verificar si Python está instalado
python --version 2>NUL
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python no esta instalado. Por favor, instala Python 3.8 o superior
    pause
    exit /b 1
) else (
    echo [OK] Python esta instalado
)

REM Verificar si pip está instalado
pip --version 2>NUL
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] pip no esta instalado. Intentando instalar...
    python -m ensurepip --upgrade
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] No se pudo instalar pip. Por favor, instalalo manualmente.
        pause
        exit /b 1
    )
) else (
    echo [OK] pip esta instalado
)

REM Instalar dependencias
echo Instalando dependencias...
pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Error al instalar dependencias. Verifica que el archivo requirements.txt existe.
    pause
    exit /b 1
) else (
    echo [OK] Dependencias instaladas correctamente
)

REM Verificar archivo .env
if exist .env (
    echo [OK] Archivo .env encontrado
) else (
    echo Creando archivo .env...
    echo Por favor, ingresa el token de tu bot de Telegram:
    set /p BOT_TOKEN="> "
    echo BOT_TOKEN=%BOT_TOKEN% > .env
    echo [OK] Archivo .env creado con el token del bot
)

REM Preguntar por la contraseña de aplicación para el correo
echo Por favor, ingresa la contraseña de aplicación para el correo (o deja en blanco si no usas informe_semanal.py):
set /p EMAIL_APP_PASSWORD="> "
if not "%EMAIL_APP_PASSWORD%"=="" (
    echo EMAIL_APP_PASSWORD=%EMAIL_APP_PASSWORD% >> .env
)

echo.
echo ================================================================
echo PASOS PARA COMPLETAR LA CONFIGURACION:
echo ================================================================
echo 1. Registra tu bot con BotFather en Telegram:
echo    - Abre Telegram y busca @BotFather
echo    - Escribe /newbot y sigue las instrucciones
echo    - Cuando obtengas un token, cópialo y ejecútame de nuevo
echo.
echo 2. Configura tu bot con estos comandos en BotFather:
echo    - /setcommands
echo    - Selecciona tu bot
echo    - Pega estos comandos:
echo      start - Iniciar la conversacion
echo      info - Informacion sobre el curso
echo      beneficios - Ver beneficios del curso
echo      testimonios - Ver testimonios de alumnos
echo      precio - Ver precios y ofertas
echo      contacto - Informacion de contacto
echo.
echo 3. Personaliza tu bot en BotFather:
echo    - /setname - Cambia el nombre visible
echo    - /setdescription - Anade una descripcion
echo    - /setabouttext - Texto que aparece en el perfil
echo    - /setuserpic - Personaliza la imagen de perfil
echo.
echo 4. Para iniciar el bot, ejecuta:
echo    python telegram_bot.py
echo.
echo ================================================================
echo Configuracion completada correctamente.
echo El bot esta listo para usarse.
echo ================================================================

echo.
echo Presiona cualquier tecla para salir...
pause > nul 