#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}Configuración del Bot de Telegram para Limpieza Facial Profesional${NC}"
echo -e "${BLUE}=================================================================${NC}"

# Verificar si Python está instalado
if command -v python3 &>/dev/null; then
    echo -e "${GREEN}✅ Python está instalado${NC}"
    python3 --version
else
    echo -e "${RED}❌ Python no está instalado. Por favor, instala Python 3.8 o superior${NC}"
    exit 1
fi

# Verificar si pip está instalado
if command -v pip &>/dev/null || command -v pip3 &>/dev/null; then
    echo -e "${GREEN}✅ pip está instalado${NC}"
else
    echo -e "${RED}❌ pip no está instalado. Intentando instalar...${NC}"
    python3 -m ensurepip --upgrade || {
        echo -e "${RED}❌ No se pudo instalar pip. Por favor, instálalo manualmente.${NC}"
        exit 1
    }
fi

# Instalar dependencias
echo -e "${YELLOW}Instalando dependencias...${NC}"
pip3 install -r requirements.txt || {
    echo -e "${RED}❌ Error al instalar dependencias. Verifica que el archivo requirements.txt existe.${NC}"
    exit 1
}
echo -e "${GREEN}✅ Dependencias instaladas correctamente${NC}"

# Verificar archivo .env
if [ -f .env ]; then
    echo -e "${GREEN}✅ Archivo .env encontrado${NC}"
else
    echo -e "${YELLOW}Creando archivo .env...${NC}"
    echo -e "${YELLOW}Por favor, ingresa el token de tu bot de Telegram:${NC}"
    read -p "> " BOT_TOKEN
    echo "BOT_TOKEN=$BOT_TOKEN" > .env
    echo -e "${GREEN}✅ Archivo .env creado con el token del bot${NC}"
    
    # Solicitar contraseña de aplicación para el correo
    echo -e "${YELLOW}Por favor, ingresa la contraseña de aplicación para el correo (o deja en blanco si no usas informe_semanal.py):${NC}"
    read -p "> " EMAIL_APP_PASSWORD
    if [ ! -z "$EMAIL_APP_PASSWORD" ]; then
        echo "EMAIL_APP_PASSWORD=$EMAIL_APP_PASSWORD" >> .env
    fi
fi

# Verificar si ngrok está instalado para pruebas locales (opcional)
if command -v ngrok &>/dev/null; then
    echo -e "${GREEN}✅ ngrok está instalado (útil para probar webhooks)${NC}"
else
    echo -e "${YELLOW}ℹ️ ngrok no está instalado. No es obligatorio, pero puede ser útil para pruebas locales.${NC}"
fi

# Instrucciones para configurar el bot en BotFather
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}PASOS PARA COMPLETAR LA CONFIGURACIÓN:${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}1. Registra tu bot con BotFather en Telegram:${NC}"
echo -e "   - Abre Telegram y busca @BotFather"
echo -e "   - Escribe /newbot y sigue las instrucciones"
echo -e "   - Cuando obtengas un token, cópialo y ejecútame de nuevo"
echo -e ""
echo -e "${YELLOW}2. Configura tu bot con estos comandos en BotFather:${NC}"
echo -e "   - /setcommands"
echo -e "   - Selecciona tu bot"
echo -e "   - Pega estos comandos:"
echo -e "     start - Iniciar la conversación"
echo -e "     info - Información sobre el curso"
echo -e "     beneficios - Ver beneficios del curso"
echo -e "     testimonios - Ver testimonios de alumnos"
echo -e "     precio - Ver precios y ofertas"
echo -e "     contacto - Información de contacto"
echo -e ""
echo -e "${YELLOW}3. Personaliza tu bot en BotFather:${NC}"
echo -e "   - /setname - Cambia el nombre visible"
echo -e "   - /setdescription - Añade una descripción"
echo -e "   - /setabouttext - Texto que aparece en el perfil"
echo -e "   - /setuserpic - Personaliza la imagen de perfil"
echo -e ""
echo -e "${YELLOW}4. Para iniciar el bot, ejecuta:${NC}"
echo -e "   python3 telegram_bot.py"
echo -e ""
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}Configuración completada correctamente.${NC}"
echo -e "${GREEN}El bot está listo para usarse.${NC}"
echo -e "${BLUE}=================================================================${NC}" 