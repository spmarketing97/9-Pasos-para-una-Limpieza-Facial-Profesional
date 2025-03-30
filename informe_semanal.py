import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import datetime
import time
import os
import schedule

# Configuración de correo electrónico
EMAIL_DESTINO = "hristiankrasimirov7@gmail.com"
EMAIL_ASUNTO = "9 pasos para una limpieza facial"
EMAIL_REMITENTE = "tu_correo@gmail.com"  # Reemplaza con tu correo
APP_PASSWORD = "rtpf fwwb xmjz mgvf"  # Clave de aplicación proporcionada

# Función para obtener estadísticas (simuladas para este ejemplo)
def obtener_estadisticas():
    # En un entorno real, aquí obtendrías datos reales de una base de datos o API
    fecha_actual = datetime.datetime.now().strftime("%d/%m/%Y")
    
    estadisticas = {
        "visitas_totales": 150 + int(datetime.datetime.now().timestamp() % 50),
        "conversiones": 15 + int(datetime.datetime.now().timestamp() % 10),
        "tasa_conversion": 0,
        "fecha_informe": fecha_actual
    }
    
    # Calcular tasa de conversión
    if estadisticas["visitas_totales"] > 0:
        estadisticas["tasa_conversion"] = round((estadisticas["conversiones"] / estadisticas["visitas_totales"]) * 100, 2)
    
    return estadisticas

# Función para crear el contenido del informe
def crear_contenido_html(estadisticas):
    html = f"""
    <html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }}
            h1 {{
                color: #2e4057;
                border-bottom: 2px solid #9be031;
                padding-bottom: 10px;
            }}
            .stats {{
                margin: 20px 0;
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 5px;
            }}
            .stat-item {{
                margin-bottom: 10px;
            }}
            .highlight {{
                color: #9be031;
                font-weight: bold;
            }}
            .footer {{
                margin-top: 30px;
                font-size: 12px;
                color: #777;
                text-align: center;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Informe Semanal: 9 Pasos para una Limpieza Facial Profesional</h1>
            <p>A continuación se presenta el informe semanal de rendimiento de la landing page:</p>
            
            <div class="stats">
                <div class="stat-item"><strong>Fecha del informe:</strong> {estadisticas['fecha_informe']}</div>
                <div class="stat-item"><strong>Visitas totales:</strong> <span class="highlight">{estadisticas['visitas_totales']}</span></div>
                <div class="stat-item"><strong>Conversiones:</strong> <span class="highlight">{estadisticas['conversiones']}</span></div>
                <div class="stat-item"><strong>Tasa de conversión:</strong> <span class="highlight">{estadisticas['tasa_conversion']}%</span></div>
            </div>
            
            <p>Este informe se genera automáticamente cada lunes a las 9:00 AM.</p>
            
            <div class="footer">
                <p>© {datetime.datetime.now().year} SPMarketing - Agency</p>
            </div>
        </div>
    </body>
    </html>
    """
    return html

# Función para enviar el correo electrónico
def enviar_informe():
    try:
        # Crear mensaje
        mensaje = MIMEMultipart()
        mensaje["From"] = EMAIL_REMITENTE
        mensaje["To"] = EMAIL_DESTINO
        mensaje["Subject"] = EMAIL_ASUNTO
        
        # Obtener estadísticas y crear contenido HTML
        estadisticas = obtener_estadisticas()
        contenido_html = crear_contenido_html(estadisticas)
        
        # Adjuntar contenido HTML al mensaje
        mensaje.attach(MIMEText(contenido_html, "html"))
        
        # Configurar conexión segura
        context = ssl.create_default_context()
        
        # Enviar correo
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as servidor:
            servidor.login(EMAIL_REMITENTE, APP_PASSWORD)
            servidor.sendmail(EMAIL_REMITENTE, EMAIL_DESTINO, mensaje.as_string())
        
        print(f"Informe enviado correctamente a {EMAIL_DESTINO}")
        return True
    except Exception as e:
        print(f"Error al enviar el informe: {e}")
        return False

# Función para ejecutar el programa
def main():
    # Programar el envío de informes cada lunes a las 9:00 AM
    schedule.every().monday.at("09:00").do(enviar_informe)
    
    print("Servicio de informes semanales iniciado.")
    print(f"Se enviará un informe a {EMAIL_DESTINO} todos los lunes a las 9:00 AM.")
    
    # Para pruebas, enviar un informe inmediatamente
    print("Enviando informe de prueba...")
    enviar_informe()
    
    # Bucle principal para mantener el programa en ejecución
    while True:
        schedule.run_pending()
        time.sleep(60)  # Comprobar cada minuto

if __name__ == "__main__":
    main() 