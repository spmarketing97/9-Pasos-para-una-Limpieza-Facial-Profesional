# Archivos para subir a GitHub

Este documento enumera los archivos que SÍ debes subir a GitHub y los que NO debes subir para mantener la seguridad del proyecto.

## ✅ ARCHIVOS QUE SÍ DEBES SUBIR

### Archivos HTML, CSS y JS
- `index.html`
- `styles.css`
- `script.js`
- `cookies.html`
- `privacidad.html`
- `terminos.html`
- `js/` (todo el contenido de esta carpeta)

### Archivos de Configuración
- `.gitignore`
- `requirements.txt` (en la raíz)
- `chatbot/requirements.txt`
- `README.md`
- `FILES_TO_UPLOAD.md` (este archivo)
- `informe_semanal_template.py` (plantilla sin credenciales)

### Scripts del Bot
- `chatbot/telegram_bot.py` (ya está modificado para proteger el token)
- `chatbot/chatbot.js`
- `chatbot/telegram-widget.html`
- `chatbot/setup_bot.bat` (ya está modificado para solicitar el token)
- `chatbot/setup_bot.sh` (ya está modificado para solicitar el token)
- `chatbot/start_bot.bat`

### Recursos Multimedia
- `img/` (todo el contenido de esta carpeta)
- `Video/` (todo el contenido de esta carpeta)
- `Cuestionario/` (todo el contenido de esta carpeta)

## ❌ ARCHIVOS QUE NO DEBES SUBIR

### Archivos Sensibles (ya están en .gitignore)
- `.env` (en la raíz)
- `chatbot/.env`
- `informe_semanal.py` (contiene credenciales de correo)
- `start_informe.bat`
- `start_informe.sh`
- `analytics-report.log`

### Directorios con Datos Sensibles
- `analytics/`
- `reports/`
- `NO GITHUB/`

## 🔄 INSTRUCCIONES DE CONFIGURACIÓN

1. **Para el Bot de Telegram**:
   - Después de clonar el repositorio, ejecuta:
     - En Windows: `chatbot/setup_bot.bat`
     - En Linux/Mac: `bash chatbot/setup_bot.sh`
   - Introduce tu token de Telegram cuando se solicite

2. **Para el Informe Semanal**:
   - Copia `informe_semanal_template.py` como `informe_semanal.py`
   - Configura tus credenciales en el archivo (correo, contraseña)
   - Ejecuta:
     - En Windows: `start_informe.bat`
     - En Linux/Mac: `bash start_informe.sh`

## 🔒 RECUERDA
Nunca subas archivos que contengan tokens, contraseñas u otra información sensible a GitHub. 