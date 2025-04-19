# Guía para subir archivos a GitHub

## Archivos que SÍ se deben subir a GitHub

### Archivos HTML, CSS y JavaScript básicos
- `index.html`
- `styles.css`
- `script.js`
- `cookies.html`
- `privacidad.html`
- `terminos.html`

### Carpetas de recursos
- `img/` (imágenes del sitio)
- `js/` (scripts adicionales)
- `Video/` (solo si son videos de muestra o ligeros, evitar videos grandes)
- `chatbot/` (código del chatbot)
- `Cuestionario/` (archivos del cuestionario)

### Archivos de documentación y configuración
- `README.md`
- `site.webmanifest`
- `FILES_TO_UPLOAD.md` (este archivo)
- `.gitignore` (para excluir archivos sensibles)
- `informe_semanal_template.py` (plantilla sin credenciales)
- `requirements.txt` (dependencias del proyecto)

## Archivos que NO se deben subir a GitHub (ya configurados en .gitignore)

### Archivos con credenciales o datos sensibles
- `.env` (contiene credenciales de correo y Analytics)
- `informe_semanal.py` (contiene implementación específica con credenciales)
- `analytics-report.log` (contiene datos de seguimiento)
- `service-account.json` (si existe)
- `google-credentials.json` (si existe)
- `google-analytics-credentials.json` (si existe)

### Carpetas con datos sensibles o generados
- `analytics/` (contiene datos analíticos)
- `reports/` (contiene informes generados)
- `/credentials/` (si existe)
- `/.google/` (si existe)

### Scripts con posibles credenciales
- `start_informe.bat` (script de inicio para Windows)
- `start_informe.sh` (script de inicio para Linux/Mac)

## Instrucciones para subir el proyecto a GitHub

1. Asegúrate de que el archivo `.gitignore` está correctamente configurado (ya lo está).
2. Inicializa el repositorio Git si aún no lo has hecho:
   ```
   git init
   ```
3. Añade los archivos que se deben subir:
   ```
   git add .
   ```
   (Git automáticamente ignorará los archivos especificados en `.gitignore`)
4. Realiza el commit inicial:
   ```
   git commit -m "Versión inicial del sitio web '9 Pasos para una Limpieza Facial Profesional'"
   ```
5. Crea un repositorio nuevo en GitHub.
6. Sigue las instrucciones de GitHub para subir un repositorio existente.

## Instrucciones para desplegar el proyecto en producción

Cuando despliegues el proyecto en un servidor de producción, deberás:

1. Subir todos los archivos, incluyendo los que no se suben a GitHub.
2. Configurar las variables de entorno en el servidor (no usar el archivo `.env` directamente).
3. Instalar las dependencias con pip:
   ```
   pip install -r requirements.txt
   ```
4. Configurar el cron job o tarea programada para ejecutar el informe semanal.

## Notas importantes sobre seguridad

- **NUNCA** subas archivos con credenciales a repositorios públicos.
- Si accidentalmente has subido información sensible, cambia inmediatamente las contraseñas/tokens y actualiza el historial de Git.
- Para mayor seguridad, considera usar servicios como GitHub Secrets o variables de entorno en tu servidor de despliegue. 