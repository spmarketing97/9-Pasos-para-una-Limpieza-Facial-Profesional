#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import logging
import json
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, CallbackQuery
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ConversationHandler, CallbackQueryHandler, ContextTypes

# Configuración de logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

# Estados para ConversationHandler
START, MENU, INFO, BENEFICIOS, TESTIMONIOS, PRECIO, CONTACT = range(7)

# Para proteger el token, lo guardaremos en un archivo .env
# Crea un archivo .env con: BOT_TOKEN=tu_token_aquí
load_dotenv()

# Obtener el token de bot desde variables de entorno
BOT_TOKEN = os.getenv("BOT_TOKEN")

if not BOT_TOKEN:
    logger.error("No se encontró el token del bot. Por favor, configura la variable de entorno BOT_TOKEN o crea un archivo .env")
    exit(1)

# Clase para extraer y almacenar la información de la página web
class WebsiteInfo:
    def __init__(self):
        self.info = {}
        self.url = "https://tu-dominio.com/limpieza-facial-profesional"
        
    def extract_info(self):
        """Extraer información de la página web"""
        try:
            # En un entorno real, haríamos scraping aquí
            # Por ahora, cargaremos datos de ejemplo basados en el sitio web
            
            # Información del curso
            self.info["titulo"] = "9 Pasos para una Limpieza Facial Profesional"
            self.info["descripcion"] = "Aprende los 9 pasos esenciales para realizar una limpieza facial profesional. Curso completo con certificación para destacar en el ámbito de la estética."
            
            # Beneficios
            self.info["beneficios"] = [
                "Conocimiento Teórico y Práctico",
                "Tu Propio Negocio",
                "Aprendizaje Detallado",
                "Profesionalización",
                "Certificación"
            ]
            
            # Módulos
            self.info["modulos"] = [
                "MÓDULO 1 - CREA TU PROPIO NEGOCIO",
                "MÓDULO 2 - PRIMEROS 3 PASOS",
                "MÓDULO 3 - CUARTO, QUINTO Y SEXTO PASO",
                "MÓDULO 4 - SÉPTIMO, OCTAVO Y NOVENO PASO",
                "MÓDULO 5 - CLAVES PARA TENER UN NEGOCIO EXITOSO",
                "MÓDULO 6 – MATERIAL ADICIONAL (BONOS)",
                "MÓDULO 7 - VIDEO RESPUESTAS",
                "MÓDULO 8 - ¿CÓMO OBTENER TU CERTIFICADO?"
            ]
            
            # Testimonios
            self.info["testimonios"] = [
                {"nombre": "María González", "profesion": "Esteticista Profesional", "comentario": "Este curso transformó mi carrera por completo. Ahora tengo mi propio negocio de limpieza facial y mis clientes están encantados con los resultados. ¡Mis ingresos se han duplicado!"},
                {"nombre": "Carolina Herrera", "profesion": "Estudiante de Estética", "comentario": "La claridad con la que Maylin explica cada paso es increíble. Logré dominar técnicas profesionales en tiempo récord y ahora puedo ofrecer servicios premium a mis clientes."},
                {"nombre": "Luisa Martínez", "profesion": "Emprendedora", "comentario": "Los módulos están muy bien estructurados y el material adicional es de gran valor. Sin duda, una excelente inversión para mi futuro. He podido abrir mi propio centro estético."}
            ]
            
            # Precios
            self.info["precio_regular"] = "$199.99 USD"
            self.info["precio_oferta"] = "$113.74 USD"
            
            # Características incluidas
            self.info["caracteristicas"] = [
                "Acceso de por vida al contenido",
                "Certificado avalado",
                "Material de estudio descargable",
                "Bonos exclusivos"
            ]
            
            # Link de compra
            self.info["link_compra"] = "https://hotm.art/PasosparaunaLimpiezaFacialProfesional-CheckOut"
            
            # Contacto
            self.info["contacto_email"] = "hristiankrasimirov7@gmail.com"
            
            logger.info("Información extraída correctamente")
            return True
        except Exception as e:
            logger.error(f"Error al extraer información: {e}")
            return False

# Inicializar la información del sitio web
website = WebsiteInfo()
website.extract_info()

# Funciones del bot
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Iniciar la conversación y mostrar opciones principales."""
    user = update.effective_user
    
    keyboard = [
        [InlineKeyboardButton("👨‍🏫 ¿De qué trata el curso?", callback_data=str(INFO))],
        [InlineKeyboardButton("✨ Beneficios", callback_data=str(BENEFICIOS))],
        [InlineKeyboardButton("💬 Testimonios", callback_data=str(TESTIMONIOS))],
        [InlineKeyboardButton("💰 Precio y Oferta", callback_data=str(PRECIO))],
        [InlineKeyboardButton("📞 Contacto", callback_data=str(CONTACT))],
        [InlineKeyboardButton("🛒 ¡Quiero inscribirme!", url=website.info["link_compra"])]
    ]
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        f"¡Hola {user.first_name}! 👋\n\n"
        f"Bienvenido/a al bot oficial de *{website.info['titulo']}*.\n\n"
        f"¿En qué puedo ayudarte hoy?",
        reply_markup=reply_markup,
        parse_mode="Markdown"
    )
    
    return MENU

async def menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Manejar las opciones del menú principal"""
    query = update.callback_query
    await query.answer()
    
    if query.data == str(INFO):
        return await info_curso(update, context)
    elif query.data == str(BENEFICIOS):
        return await beneficios(update, context)
    elif query.data == str(TESTIMONIOS):
        return await testimonios(update, context)
    elif query.data == str(PRECIO):
        return await precio(update, context)
    elif query.data == str(CONTACT):
        return await contacto(update, context)
    
    return MENU

async def info_curso(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Mostrar información sobre el curso"""
    query = update.callback_query
    
    # Información sobre los módulos
    modulos_text = "\n".join([f"• {modulo}" for modulo in website.info["modulos"]])
    
    keyboard = [
        [InlineKeyboardButton("💰 Ver precios", callback_data=str(PRECIO))],
        [InlineKeyboardButton("✨ Ver beneficios", callback_data=str(BENEFICIOS))],
        [InlineKeyboardButton("🛒 ¡Quiero inscribirme!", url=website.info["link_compra"])],
        [InlineKeyboardButton("◀️ Volver al menú", callback_data=str(MENU))]
    ]
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await query.edit_message_text(
        f"*{website.info['titulo']}*\n\n"
        f"{website.info['descripcion']}\n\n"
        f"*📚 Contenido del curso:*\n{modulos_text}\n\n"
        f"Aprende a realizar limpiezas faciales profesionales y destaca en el ámbito de la estética.",
        reply_markup=reply_markup,
        parse_mode="Markdown"
    )
    
    return MENU

async def beneficios(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Mostrar los beneficios del curso"""
    query = update.callback_query
    
    # Lista de beneficios
    beneficios_text = "\n".join([f"✅ {beneficio}" for beneficio in website.info["beneficios"]])
    
    keyboard = [
        [InlineKeyboardButton("💬 Ver testimonios", callback_data=str(TESTIMONIOS))],
        [InlineKeyboardButton("💰 Ver precios", callback_data=str(PRECIO))],
        [InlineKeyboardButton("🛒 ¡Quiero inscribirme!", url=website.info["link_compra"])],
        [InlineKeyboardButton("◀️ Volver al menú", callback_data=str(MENU))]
    ]
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await query.edit_message_text(
        f"*¿QUÉ VAS A LOGRAR?*\n\n"
        f"{beneficios_text}\n\n"
        f"Este curso te dará todas las herramientas que necesitas para destacar en el mundo de la estética.",
        reply_markup=reply_markup,
        parse_mode="Markdown"
    )
    
    return MENU

async def testimonios(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Mostrar testimonios de alumnos"""
    query = update.callback_query
    
    # Combina los testimonios en un solo texto
    testimonios_text = ""
    for t in website.info["testimonios"]:
        testimonios_text += f"👤 *{t['nombre']}* - _{t['profesion']}_\n"
        testimonios_text += f"\"{t['comentario']}\"\n\n"
    
    keyboard = [
        [InlineKeyboardButton("💰 Ver precios", callback_data=str(PRECIO))],
        [InlineKeyboardButton("✨ Ver beneficios", callback_data=str(BENEFICIOS))],
        [InlineKeyboardButton("🛒 ¡Quiero inscribirme!", url=website.info["link_compra"])],
        [InlineKeyboardButton("◀️ Volver al menú", callback_data=str(MENU))]
    ]
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await query.edit_message_text(
        f"*LO QUE DICEN NUESTROS ALUMNOS*\n\n"
        f"{testimonios_text}"
        f"¿Te gustaría unirte a nuestros alumnos exitosos?",
        reply_markup=reply_markup,
        parse_mode="Markdown"
    )
    
    return MENU

async def precio(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Mostrar información de precios y ofertas"""
    query = update.callback_query
    
    # Características incluidas
    caracteristicas_text = "\n".join([f"✅ {carac}" for carac in website.info["caracteristicas"]])
    
    keyboard = [
        [InlineKeyboardButton("🛒 ¡INSCRIBIRME AHORA!", url=website.info["link_compra"])],
        [InlineKeyboardButton("💬 Ver testimonios", callback_data=str(TESTIMONIOS))],
        [InlineKeyboardButton("📞 Contactar para dudas", callback_data=str(CONTACT))],
        [InlineKeyboardButton("◀️ Volver al menú", callback_data=str(MENU))]
    ]
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await query.edit_message_text(
        f"*INVIERTE EN TU FUTURO PROFESIONAL*\n\n"
        f"Precio regular: ~{website.info['precio_regular']}~\n"
        f"*OFERTA ESPECIAL: {website.info['precio_oferta']}*\n\n"
        f"*Lo que incluye:*\n{caracteristicas_text}\n\n"
        f"*¡Oferta por tiempo limitado!*",
        reply_markup=reply_markup,
        parse_mode="Markdown"
    )
    
    return MENU

async def contacto(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Mostrar información de contacto"""
    query = update.callback_query
    
    keyboard = [
        [InlineKeyboardButton("💰 Ver precios", callback_data=str(PRECIO))],
        [InlineKeyboardButton("🛒 ¡Quiero inscribirme!", url=website.info["link_compra"])],
        [InlineKeyboardButton("◀️ Volver al menú", callback_data=str(MENU))]
    ]
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await query.edit_message_text(
        f"*CONTACTO*\n\n"
        f"¿Tienes alguna pregunta sobre el curso?\n\n"
        f"📧 Email: {website.info['contacto_email']}\n"
        f"💬 También puedes escribir directamente en este chat y te responderemos a la brevedad.\n\n"
        f"¡Estamos para ayudarte!",
        reply_markup=reply_markup,
        parse_mode="Markdown"
    )
    
    return MENU

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Manejar mensajes de texto del usuario"""
    text = update.message.text.lower()
    
    # Palabras clave para dirigir al usuario
    if any(word in text for word in ["precio", "costo", "valor", "pagar", "oferta"]):
        keyboard = [
            [InlineKeyboardButton("💰 Ver detalles de precios", callback_data=str(PRECIO))],
            [InlineKeyboardButton("🛒 ¡Inscribirme ahora!", url=website.info["link_compra"])],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            "Tenemos una oferta especial por tiempo limitado. ¡No te la pierdas!",
            reply_markup=reply_markup
        )
        
    elif any(word in text for word in ["beneficio", "lograr", "aprender", "conseguir"]):
        keyboard = [
            [InlineKeyboardButton("✨ Ver todos los beneficios", callback_data=str(BENEFICIOS))],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            "Este curso te ofrece múltiples beneficios para destacar en el mundo de la estética.",
            reply_markup=reply_markup
        )
        
    elif any(word in text for word in ["testimonio", "alumno", "opinión", "resultados"]):
        keyboard = [
            [InlineKeyboardButton("💬 Ver testimonios", callback_data=str(TESTIMONIOS))],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            "Nuestros alumnos han obtenido excelentes resultados. ¡Mira lo que dicen!",
            reply_markup=reply_markup
        )
        
    elif any(word in text for word in ["contacto", "duda", "pregunta", "email", "correo"]):
        keyboard = [
            [InlineKeyboardButton("📞 Ver información de contacto", callback_data=str(CONTACT))],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            "¿Tienes dudas? Podemos ayudarte.",
            reply_markup=reply_markup
        )
        
    elif any(word in text for word in ["comprar", "inscribir", "pagar", "adquirir"]):
        keyboard = [
            [InlineKeyboardButton("🛒 ¡Inscribirme ahora!", url=website.info["link_compra"])],
            [InlineKeyboardButton("💰 Ver detalles de precios", callback_data=str(PRECIO))],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            "¡Estás a un paso de transformar tu carrera profesional!",
            reply_markup=reply_markup
        )
        
    else:
        # Respuesta por defecto con el menú principal
        keyboard = [
            [InlineKeyboardButton("👨‍🏫 ¿De qué trata el curso?", callback_data=str(INFO))],
            [InlineKeyboardButton("✨ Beneficios", callback_data=str(BENEFICIOS))],
            [InlineKeyboardButton("💬 Testimonios", callback_data=str(TESTIMONIOS))],
            [InlineKeyboardButton("💰 Precio y Oferta", callback_data=str(PRECIO))],
            [InlineKeyboardButton("📞 Contacto", callback_data=str(CONTACT))],
            [InlineKeyboardButton("🛒 ¡Quiero inscribirme!", url=website.info["link_compra"])]
        ]
        
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            "Gracias por tu mensaje. ¿En qué puedo ayudarte?",
            reply_markup=reply_markup
        )
    
    return MENU

async def error_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Manejar errores en el bot"""
    logger.error(f"Error: {context.error} - Update: {update}")
    if update and update.effective_message:
        await update.effective_message.reply_text(
            "Ha ocurrido un error. Por favor, intenta de nuevo más tarde."
        )

def main() -> None:
    """Iniciar el bot"""
    # Crear la aplicación
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Configurar manejador de conversación
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            MENU: [
                CallbackQueryHandler(menu, pattern=f"^{MENU}$|^{INFO}$|^{BENEFICIOS}$|^{TESTIMONIOS}$|^{PRECIO}$|^{CONTACT}$")
            ],
        },
        fallbacks=[
            MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message),
            CommandHandler("start", start)
        ],
    )
    
    application.add_handler(conv_handler)
    
    # Manejar errores
    application.add_error_handler(error_handler)
    
    # Iniciar el bot
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main() 