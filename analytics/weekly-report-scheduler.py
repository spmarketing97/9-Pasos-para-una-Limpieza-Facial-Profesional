#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Programador de tareas para informes semanales de analytics
Configura una tarea en Windows Task Scheduler para ejecutar analytics-report.py cada semana.

Uso:
    python weekly-report-scheduler.py [--install | --uninstall]
"""

import os
import sys
import subprocess
import argparse
import datetime
import logging
from pathlib import Path

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('analytics-report.log', mode='a'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('weekly-report-scheduler')

# Configuración de la tarea
TASK_NAME = "9PasosLimpiezaFacial_WeeklyReport"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ANALYTICS_SCRIPT = os.path.join(SCRIPT_DIR, "analytics-report.py")

def check_python_path():
    """Verifica y retorna la ruta completa a Python"""
    try:
        # Intentar obtener la ruta completa a Python
        python_path = sys.executable
        if not python_path or not os.path.exists(python_path):
            raise ValueError("No se pudo determinar la ruta a Python")
        
        return python_path
    except Exception as e:
        logger.error(f"Error al verificar Python: {str(e)}")
        sys.exit(1)

def install_task():
    """Instala la tarea programada en Windows Task Scheduler"""
    try:
        python_path = check_python_path()
        
        # Crear el directorio de informes si no existe
        reports_dir = os.path.join(SCRIPT_DIR, "analytics", "reports")
        os.makedirs(reports_dir, exist_ok=True)
        
        # Crear el directorio de charts si no existe
        charts_dir = os.path.join(reports_dir, "charts")
        os.makedirs(charts_dir, exist_ok=True)
        
        # Generar un informe inicial de prueba
        logger.info("Generando un informe inicial de prueba...")
        subprocess.run([python_path, ANALYTICS_SCRIPT, "--generate-test"], 
                      shell=True, 
                      cwd=SCRIPT_DIR)
        
        # Crear la tarea programada
        task_time = "09:00"
        task_script = f'"{python_path}" "{ANALYTICS_SCRIPT}"'
        
        # Construir el comando schtasks para crear la tarea
        cmd = [
            'schtasks', '/create', '/f',
            '/tn', TASK_NAME,
            '/sc', 'WEEKLY',
            '/d', 'MON',
            '/st', task_time,
            '/tr', task_script
        ]
        
        # Ejecutar el comando
        logger.info(f"Instalando tarea programada: {' '.join(cmd)}")
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            logger.info("Tarea programada instalada correctamente.")
            logger.info(f"El informe se generará automáticamente cada lunes a las {task_time}.")
            
            # Verificar si la tarea se instaló correctamente
            verify_cmd = ['schtasks', '/query', '/tn', TASK_NAME]
            verify_result = subprocess.run(verify_cmd, capture_output=True, text=True)
            
            if verify_result.returncode == 0:
                logger.info("Verificación: la tarea está instalada correctamente.")
                return True
            else:
                logger.warning("No se pudo verificar la instalación de la tarea.")
        else:
            logger.error(f"Error al instalar la tarea: {result.stderr}")
            return False
            
    except Exception as e:
        logger.error(f"Error al instalar la tarea: {str(e)}")
        return False

def uninstall_task():
    """Desinstala la tarea programada"""
    try:
        # Verificar si la tarea existe
        verify_cmd = ['schtasks', '/query', '/tn', TASK_NAME]
        verify_result = subprocess.run(verify_cmd, capture_output=True, text=True)
        
        if verify_result.returncode != 0:
            logger.info("La tarea no está instalada. No hay nada que desinstalar.")
            return True
        
        # Construir el comando para eliminar la tarea
        cmd = ['schtasks', '/delete', '/f', '/tn', TASK_NAME]
        
        # Ejecutar el comando
        logger.info(f"Desinstalando tarea programada: {' '.join(cmd)}")
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            logger.info("Tarea programada desinstalada correctamente.")
            return True
        else:
            logger.error(f"Error al desinstalar la tarea: {result.stderr}")
            return False
            
    except Exception as e:
        logger.error(f"Error al desinstalar la tarea: {str(e)}")
        return False

def main():
    """Función principal"""
    parser = argparse.ArgumentParser(description='Configurador de tareas programadas para informes semanales')
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--install', action='store_true', help='Instalar la tarea programada')
    group.add_argument('--uninstall', action='store_true', help='Desinstalar la tarea programada')
    group.add_argument('--generate-test', action='store_true', help='Generar un informe de prueba inmediatamente')
    
    args = parser.parse_args()
    
    if args.install:
        success = install_task()
        sys.exit(0 if success else 1)
    elif args.uninstall:
        success = uninstall_task()
        sys.exit(0 if success else 1)
    elif args.generate_test:
        python_path = check_python_path()
        logger.info("Generando informe de prueba...")
        subprocess.run([python_path, ANALYTICS_SCRIPT, "--generate-test"], 
                      shell=True, 
                      cwd=SCRIPT_DIR)
        logger.info("Informe de prueba generado.")
        sys.exit(0)

if __name__ == "__main__":
    main() 