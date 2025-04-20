#!/bin/bash
# Script para ejecutar el informe semanal con las credenciales de Google Analytics
echo "Configurando informe semanal..."

# Establecer la ruta absoluta al archivo de credenciales
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
CREDENTIALS_PATH="$SCRIPT_DIR/analytics/credentials/credentials.json"

# Verificar si el archivo de credenciales existe
if [ ! -f "$CREDENTIALS_PATH" ]; then
    echo "ERROR: No se encontró el archivo de credenciales en:"
    echo "$CREDENTIALS_PATH"
    echo
    echo "Por favor, coloca el archivo credentials.json en la carpeta analytics/credentials/"
    echo "Consulta analytics/credentials/README.md para obtener instrucciones."
    exit 1
fi

# Configurar la variable de entorno para Google Analytics
export GOOGLE_APPLICATION_CREDENTIALS="$CREDENTIALS_PATH"
echo "Variable de entorno configurada: GOOGLE_APPLICATION_CREDENTIALS=$GOOGLE_APPLICATION_CREDENTIALS"

# Ejecutar el script de informe semanal
echo "Ejecutando informe semanal..."
python informe_semanal.py

# Si hay un error, mostrar mensaje
if [ $? -ne 0 ]; then
    echo "ERROR: El informe semanal falló con código $?"
    exit $?
fi

echo "Informe semanal completado correctamente." 