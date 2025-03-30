# Sistema de Análisis para "9 Pasos para una Limpieza Facial Profesional"

Este sistema recopila datos de uso de la landing page y del cuestionario, y genera informes semanales automáticos que se envían por correo electrónico.

## Contenido

- [Componentes](#componentes)
- [Configuración](#configuración)
- [Uso](#uso)
- [Programación de informes semanales](#programación-de-informes-semanales)
- [Estructura de directorios](#estructura-de-directorios)

## Componentes

El sistema está compuesto por los siguientes componentes:

1. **analytics.js**: Script JavaScript para el seguimiento de acciones de los usuarios en la landing page y el cuestionario.
2. **analytics-report.py**: Script Python para generar informes semanales.
3. **weekly-report-scheduler.py**: Programador que ejecuta el script de informes cada lunes a las 9:00 AM.
4. **setup-task.bat**: Script para configurar una tarea programada en Windows.

## Configuración

### Requisitos previos

- Python 3.6 o superior
- Bibliotecas Python: matplotlib, sqlite3, smtplib, email
- Navegador con soporte para localStorage

### Instalación de dependencias

Para instalar las dependencias necesarias, ejecuta:

```
pip install matplotlib
```

### Configuración del servidor de correo

Edita el archivo `analytics-report.py` para configurar el servidor SMTP que enviará los correos:

```python
CONFIG = {
    # ... otras configuraciones ...
    'email': {
        'sender': 'tu_correo@gmail.com',  # Tu dirección de Gmail
        'recipients': ['destinatario@example.com'],  # Destinatarios
        'subject_template': '9 Pasos para una Limpieza Facial - Informe Semanal ({date})',
        'smtp_server': 'smtp.gmail.com',
        'smtp_port': 587,
        'smtp_user': 'tu_correo@gmail.com',  # Tu dirección de Gmail
        'smtp_password': 'tu_contraseña_de_aplicación'  # Contraseña generada en el paso 2
    },
    # ... otras configuraciones ...
}
```

**Nota importante:** Para Gmail, necesitarás generar una "Contraseña de aplicación" en la configuración de seguridad de tu cuenta.

### Configuración de la Contraseña de Aplicación de Google

Para que el sistema pueda enviar correos electrónicos a través de Gmail, debes seguir estos pasos:

1. **Habilitar la verificación en dos pasos en tu cuenta de Google**:
   - Ve a [Seguridad de Google Account](https://myaccount.google.com/security)
   - Habilita la verificación en dos pasos (2FA)

2. **Generar una contraseña de aplicación**:
   - Ve a [Contraseñas de aplicación](https://myaccount.google.com/apppasswords)
   - Selecciona "Otra (nombre personalizado)" e introduce "Informe Analytics"
   - Google generará una contraseña de 16 caracteres (cuatro bloques de 4 caracteres)
   - Copia esta contraseña exactamente como aparece

3. **Actualizar la configuración en analytics-report.py**:
   - Abre `analytics-report.py`
   - Encuentra la sección CONFIG
   - Actualiza los valores en la sección 'email':
     ```python
     'email': {
         'sender': 'tu_correo@gmail.com',  # Tu dirección de Gmail
         'recipients': ['destinatario@example.com'],  # Destinatarios
         'subject_template': '9 Pasos para una Limpieza Facial - Informe Semanal ({date})',
         'smtp_server': 'smtp.gmail.com',
         'smtp_port': 587,
         'smtp_user': 'tu_correo@gmail.com',  # Tu dirección de Gmail
         'smtp_password': 'tu_contraseña_de_aplicación'  # Contraseña generada en el paso 2
     }
     ```

4. **Solución de problemas comunes**:
   - **Error "Username and Password not accepted"**: 
     - Asegúrate de que la verificación en dos pasos está habilitada
     - Genera una nueva contraseña de aplicación
     - Al copiar la contraseña, no incluyas espacios adicionales
     - Si has cambiado tu contraseña principal, debes generar una nueva contraseña de aplicación
   
   - **La contraseña no funciona**:
     - Las contraseñas de aplicación se revocan cuando cambias tu contraseña principal
     - Cada contraseña de aplicación debe usarse exactamente como se genera
     - Para solucionar problemas: elimina la contraseña existente y genera una nueva

## Uso

### Integración en la landing page

1. Añade el script de analytics en la página principal:

```html
<!-- En el index.html antes de cerrar el body -->
<script src="analytics/analytics.js"></script>
```

2. Añade el script de analytics en el cuestionario:

```html
<!-- En el Cuestionario/index.html antes de cerrar el body -->
<script src="../analytics/analytics.js"></script>
```