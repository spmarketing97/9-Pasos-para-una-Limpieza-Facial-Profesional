# Landing Page - 9 Pasos para una Limpieza Facial Profesional

Esta es una landing page profesional, moderna y animada para promocionar el curso "9 Pasos para una Limpieza Facial Profesional". Está diseñada para maximizar conversiones con una experiencia de usuario atractiva y enfocada en destacar los beneficios del curso.

## Estructura del Proyecto

```
.
├── index.html           # Archivo HTML principal
├── styles.css           # Estilos CSS para todo el sitio
├── script.js            # JavaScript principal para interactividad
├── js/                  # Carpeta con scripts adicionales
│   └── video-autoplay.js # Script para autoplay del video
├── img/                 # Carpeta con todas las imágenes
│   ├── banner.jpg       # Imagen del encabezado
│   ├── banner2.jpg      # Imagen de la sección de precios
│   ├── certificado.jpg  # Imagen del certificado
│   ├── logo.png         # Logo para el footer
│   ├── favicon.ico      # Favicon del sitio
│   └── testimonial*.jpg # Imágenes para testimonios (7 imágenes)
└── Video/               # Carpeta con el video principal
    └── banner-video.mp4 # Video promocional del curso
```

## Características

- **Diseño Responsivo**: Se adapta perfectamente a móviles, tablets y computadoras
- **Video de Demostración**: Video prominente que muestra el valor del curso
- **Slider de Testimonios**: Testimonios de alumnos que generan confianza
- **Módulos Acordeón**: Contenido del curso organizado en secciones desplegables
- **Llamados a la Acción Estratégicos**: Botones de conversión ubicados en puntos clave
- **Animaciones Suaves**: Animaciones de entrada en secciones al hacer scroll
- **Optimizado para SEO**: Meta etiquetas correctamente implementadas
- **Integración con Telegram**: Botón de contacto directo a Telegram
- **Optimizado para Velocidad**: Carga rápida de recursos

## Requisitos para Implementación

### Imágenes Necesarias

- `banner.jpg`: Imagen principal para el encabezado (1920×1080px recomendado)
- `banner2.jpg`: Imagen para la sección de precios (1200×800px recomendado)
- `certificado.jpg`: Imagen del certificado (800×600px recomendado)
- `logo.png`: Logo para el footer (200×80px recomendado)
- `favicon.ico`: Icono para la pestaña del navegador (32×32px)
- `testimonial1.jpg` a `testimonial7.jpg`: Fotos para los testimonios (200×200px, formato cuadrado)

### Video

- `banner-video.mp4`: Video promocional del curso (formato MP4, resolución HD recomendada)

## Cómo Subir el Sitio Online

### Opción 1: Alojamiento Web Tradicional (cPanel, etc.)

1. **Adquirir Alojamiento y Dominio**:
   - Compra un plan de hosting (Hostinger, SiteGround, HostGator, etc.)
   - Registra un dominio relacionado con el curso (ej: limpiezafacialprofesional.com)

2. **Subir Archivos**:
   - Accede al panel de control (cPanel) de tu hosting
   - Usa el administrador de archivos o un cliente FTP (como FileZilla)
   - Sube todos los archivos y carpetas manteniendo la estructura
   - Asegúrate que index.html esté en la carpeta raíz

3. **Configurar Dominio**:
   - Apunta tu dominio a los nameservers de tu hosting
   - Espera a que se propaguen los DNS (puede tomar hasta 48 horas)

### Opción 2: Plataformas Modernas (Netlify, Vercel)

1. **Crear una Cuenta**:
   - Regístrate en Netlify (netlify.com) o Vercel (vercel.com)

2. **Desplegar el Sitio**:
   - Arrastra y suelta la carpeta del proyecto en la interfaz de Netlify
   - O conecta tu repositorio de GitHub/GitLab/Bitbucket si usas control de versiones

3. **Configurar Dominio Personalizado** (opcional):
   - Compra un dominio desde la plataforma o conecta uno existente
   - Sigue las instrucciones para configurar los registros DNS

### Opción 3: GitHub Pages (Gratis)

1. **Crear Repositorio**:
   - Crea una cuenta en GitHub si no tienes una
   - Crea un nuevo repositorio (ej: limpieza-facial)
   - Sube todos los archivos al repositorio

2. **Activar GitHub Pages**:
   - Ve a Settings > Pages
   - Selecciona la rama principal como fuente
   - Guarda los cambios

3. **Dominio Personalizado** (opcional):
   - En la sección GitHub Pages, añade tu dominio personalizado
   - Configura los registros DNS según las instrucciones

## Personalización

### Cambiar Colores

En el archivo `styles.css` modifica las variables en la sección `:root`:

```css
:root {
    --primary-color: #9be031; /* Color principal */
    --secondary-color: #2e4057; /* Color secundario */
    --accent-color: #e84855; /* Color de acento */
    /* Otros colores... */
}
```

### Modificar Textos

Edita directamente el archivo `index.html` para cambiar los textos, títulos y descripciones.

### Cambiar Enlaces

Actualiza las URL en los botones de call-to-action y el enlace de Telegram según necesites:

```html
<a href="https://tu-link-de-venta.com" class="btn btn-primary" target="_blank">¡QUIERO INSCRIBIRME AHORA!</a>
<a href="https://t.me/TuNuevoUsuario" class="btn btn-telegram" target="_blank"><i class="fab fa-telegram"></i> Contáctanos</a>
```

## Optimización SEO y Rendimiento

- Las imágenes deben comprimirse antes de subirse (usa TinyPNG o similar)
- El video debe optimizarse para web (usa HandBrake o similar)
- Actualiza las meta etiquetas en el `<head>` del HTML con tus palabras clave específicas

## Soporte y Contacto

Para soporte técnico sobre esta landing page, contacta a través de:
- Telegram: [@SPMarketing_KR](https://t.me/SPMarketing_KR)

# Bot de Telegram para Limpieza Facial Profesional

Este bot de Telegram está diseñado para funcionar como un asistente de ventas virtual para el curso "9 Pasos para una Limpieza Facial Profesional". El bot proporciona información sobre el curso, muestra testimonios, precios, beneficios y guía a los usuarios hacia la compra.

## Características

- 🤖 Chatbot interactivo con menús y botones
- 🔒 Manejo seguro del token de API (usando variables de entorno)
- 📊 Flujo de conversación tipo embudo de ventas
- 🔍 Responde a palabras clave en los mensajes del usuario
- 📱 Llamadas a la acción (CTAs) claras para guiar al usuario

## Requisitos

- Python 3.8 o superior
- Las bibliotecas listadas en `requirements.txt`
- Una cuenta de Telegram
- Un bot creado con BotFather (@BotFather en Telegram)

## Configuración

1. **Instala las dependencias:**

```bash
pip install -r requirements.txt
```

2. **Configura las variables de entorno:**

Crea un archivo `.env` en el directorio raíz del proyecto con el siguiente contenido:

```
BOT_TOKEN=tu_token_aquí
```

Reemplaza `tu_token_aquí` con el token proporcionado por BotFather.

3. **Ejecuta el bot:**

```bash
python telegram_bot.py
```

## Seguridad

⚠️ **IMPORTANTE**: 
- Nunca incluyas el token de API directamente en el código fuente.
- No compartas el archivo `.env` en repositorios públicos.
- El bot implementa una capa de protección adicional para evitar que el token sea visible en el código o accesible para usuarios maliciosos.

## Personalización

Puedes personalizar el bot modificando los siguientes elementos:

- Textos y mensajes en las funciones de respuesta
- Estructura del menú y opciones
- Palabras clave para las respuestas automáticas
- Información extraída de la página web

## Recomendaciones de Uso

- Configura mensajes de bienvenida atractivos
- Mantén los textos concisos y directos
- Usa emojis para hacer la interacción más amigable
- Asegúrate de que cada interacción tenga una clara llamada a la acción

## Mantenimiento

Para mantener el bot funcionando correctamente:

1. Revisa periódicamente los logs para detectar errores
2. Actualiza la información de precios, testimonios, etc.
3. Asegúrate de que los enlaces de compra estén activos
4. Mantén actualizadas las dependencias de Python

---

Creado por SPMarketing – ImpactoDigital © 2023 