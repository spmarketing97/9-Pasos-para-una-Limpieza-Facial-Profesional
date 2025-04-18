/**
 * Chatbot - Embudo de ventas para 9 Pasos para una Limpieza Facial Profesional
 * Este script maneja la funcionalidad del chatbot flotante que extrae información
 * de la landing page para brindar respuestas a los usuarios y guiarlos hacia la compra.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const chatIcon = document.getElementById('chat-bot-icon');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const optionButtons = document.querySelectorAll('.option-button');
    const chatBotPopup = document.getElementById('chat-bot-popup');

    // Variable para controlar si ya se mostró el mensaje inicial
    let initialMessageShown = false;

    // Información extraída de la landing page
    const siteInfo = {
        titulo: "9 Pasos para una Limpieza Facial Profesional",
        descripcion: document.querySelector('meta[name="description"]').getAttribute('content'),
        linkCompra: "https://hotm.art/PasosparaunaLimpiezaFacialProfesional-CheckOut",
        precio: {
            regular: "179.99 USD",
            oferta: "94 USD + IVA"
        }
    };

    // Extraer beneficios
    const beneficios = [];
    document.querySelectorAll('.benefit-card h3').forEach(function(el) {
        if (el.textContent) {
            beneficios.push(el.textContent.trim());
        }
    });
    siteInfo.beneficios = beneficios;

    // Extraer módulos
    const modulos = [];
    document.querySelectorAll('.modulo-minimalista h3').forEach(function(el) {
        if (el.textContent) {
            modulos.push(el.textContent.trim());
        }
    });
    siteInfo.modulos = modulos;

    // Extraer testimonios
    const testimonios = [];
    document.querySelectorAll('.testimonial-slide').forEach(function(slide) {
        const nombre = slide.querySelector('.quote h4')?.textContent;
        const profesion = slide.querySelector('.quote span')?.textContent;
        const comentario = slide.querySelector('.quote p')?.textContent;
        
        if (nombre && comentario) {
            testimonios.push({
                nombre: nombre.trim(),
                profesion: profesion ? profesion.trim() : '',
                comentario: comentario.trim()
            });
        }
    });
    siteInfo.testimonios = testimonios;

    // Mostrar popup de saludo inicial
    setTimeout(() => {
        chatBotPopup.classList.add('active');
        
        // Ocultar popup después de 10 segundos
        setTimeout(() => {
            if (chatBotPopup.classList.contains('active')) {
                chatBotPopup.classList.remove('active');
            }
        }, 10000);
    }, 2000);

    // Funciones para controlar el chat
    function toggleChat() {
        // Ocultar el popup cuando se abre el chat
        if (chatBotPopup.classList.contains('active')) {
            chatBotPopup.classList.remove('active');
        }

        chatContainer.classList.toggle('active');
        
        // Si es la primera vez que se abre el chat, mostrar el mensaje inicial
        if (chatContainer.classList.contains('active') && !initialMessageShown) {
            // Eliminar el mensaje inicial existente
            if (chatMessages.firstChild) {
                chatMessages.removeChild(chatMessages.firstChild);
            }
            
            // Mostrar el indicador de escritura de inmediato
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'message bot-message typing-indicator';
            typingIndicator.innerHTML = '<span></span><span></span><span></span>';
            chatMessages.appendChild(typingIndicator);
            
            // Después de 3 segundos, mostrar el mensaje real
            setTimeout(() => {
                chatMessages.removeChild(typingIndicator);
                
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message bot-message';
                
                const messageContent = document.createElement('p');
                messageContent.textContent = '👋 ¡Hola! Soy tu asistente digital para el curso "9 Pasos para una Limpieza Facial Profesional". ¿En qué puedo ayudarte hoy?';
                
                messageDiv.appendChild(messageContent);
                chatMessages.appendChild(messageDiv);
                
                initialMessageShown = true;
            }, 3000);
        }
    }

    function closePopup() {
        chatContainer.classList.remove('active');
    }

    // Agrega mensaje al chat con delay para mensajes del bot
    function addMessage(text, isUser = false) {
        if (isUser) {
            // Mensajes del usuario se muestran inmediatamente
            appendMessage(text, isUser);
        } else {
            // Para los mensajes del bot, aplicamos un delay de 3 segundos
            // Mostrar indicador de escritura
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'message bot-message typing-indicator';
            typingIndicator.innerHTML = '<span></span><span></span><span></span>';
            chatMessages.appendChild(typingIndicator);
            
            // Scroll al indicador de escritura
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Después de 3 segundos, mostrar el mensaje real
            setTimeout(() => {
                chatMessages.removeChild(typingIndicator);
                appendMessage(text, isUser);
            }, 3000);
        }
    }
    
    // Función auxiliar para añadir el mensaje al DOM
    function appendMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const messageContent = document.createElement('p');
        messageContent.textContent = text;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll al final del chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Respuestas del bot según la opción
    function handleOption(option) {
        // Mostrar el mensaje del usuario
        const optionText = document.querySelector(`.option-button[data-option="${option}"]`).textContent;
        addMessage(optionText, true);
        
        // Respuesta del bot según la opción
        setTimeout(() => {
            switch(option) {
                case 'info':
                    showCourseInfo();
                    break;
                case 'beneficios':
                    showBenefits();
                    break;
                case 'testimonios':
                    showTestimonials();
                    break;
                case 'precio':
                    showPricing();
                    break;
                case 'inscripcion':
                    showSignUp();
                    break;
                default:
                    addMessage('Lo siento, no entendí tu pregunta. ¿Podrías seleccionar una de las opciones disponibles?');
            }
        }, 500); // Mantenemos este tiempo corto para que sea responsivo al clic
    }

    // Funciones para mostrar información específica
    function showCourseInfo() {
        let message = `"${siteInfo.titulo}" es un curso completo que te enseñará los 9 pasos esenciales para realizar limpiezas faciales profesionales.\n\n`;
        message += `El curso está dividido en ${siteInfo.modulos.length} módulos:\n`;
        
        // Agregar solo los primeros 3 módulos para no sobrecargar
        for (let i = 0; i < Math.min(3, siteInfo.modulos.length); i++) {
            message += `- ${siteInfo.modulos[i]}\n`;
        }
        
        message += `... y más contenido valioso!`;
        
        addMessage(message);
        
        // Ofrecer ver beneficios como siguiente paso
        setTimeout(() => {
            addMessage('¿Te gustaría conocer los beneficios del curso?');
            showFollowUpOptions(['beneficios', 'precio']);
        }, 3000);
    }

    function showBenefits() {
        let message = `Al tomar este curso, obtendrás los siguientes beneficios:\n\n`;
        
        siteInfo.beneficios.forEach(benefit => {
            message += `✅ ${benefit}\n`;
        });
        
        addMessage(message);
        
        // Ofrecer ver testimonios como siguiente paso
        setTimeout(() => {
            addMessage('¿Quieres ver lo que dicen nuestros alumnos?');
            showFollowUpOptions(['testimonios', 'precio']);
        }, 3000);
    }

    function showTestimonials() {
        // Mostrar 2 testimonios aleatorios
        const randomTestimonios = shuffleArray(siteInfo.testimonios).slice(0, 2);
        
        let message = `Esto es lo que dicen nuestros alumnos:\n\n`;
        
        randomTestimonios.forEach(testimonio => {
            message += `👤 ${testimonio.nombre} - ${testimonio.profesion}\n`;
            message += `"${testimonio.comentario}"\n\n`;
        });
        
        addMessage(message);
        
        // Ofrecer ver precio como siguiente paso
        setTimeout(() => {
            addMessage('¿Te gustaría conocer nuestros precios y la oferta especial?');
            showFollowUpOptions(['precio', 'info']);
        }, 3000);
    }

    function showPricing() {
        // Mensaje más minimalista
        let message = `OFERTA ESPECIAL: ${siteInfo.precio.oferta}\n`;
        message += `(Precio normal: ${siteInfo.precio.regular})\n\n`;
        message += `✅ Acceso de por vida\n`;
        message += `✅ Certificado avalado\n`;
        message += `✅ 7 días de garantía - 100% devolución del dinero sin preguntas\n`;
        
        addMessage(message);
        
        // Llamada a la acción más concisa
        setTimeout(() => {
            addMessage('¿Te gustaría inscribirte?');
            showFollowUpOptions(['inscripcion', 'testimonios']);
        }, 3000);
    }

    function showSignUp() {
        // Mensaje más minimalista
        let message = `Haz clic para comenzar tu formación profesional:`;
        addMessage(message);
        
        // Crear botón de inscripción más minimalista
        const signUpButton = document.createElement('a');
        signUpButton.href = siteInfo.linkCompra;
        signUpButton.target = '_blank';
        signUpButton.className = 'chat-signup-button';
        signUpButton.textContent = 'INSCRIBIRME';
        
        // Crear contenedor para el botón
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'message bot-message signup-container';
        buttonContainer.appendChild(signUpButton);
        
        chatMessages.appendChild(buttonContainer);
        
        // Scroll al final del chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Mensaje final más conciso
        setTimeout(() => {
            addMessage('¿Necesitas algo más?');
            showAllOptions();
        }, 3000);
    }

    // Funciones auxiliares
    function showFollowUpOptions(options) {
        // Ocultar todas las opciones
        optionButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Mostrar solo las opciones especificadas
        options.forEach(option => {
            const btn = document.querySelector(`.option-button[data-option="${option}"]`);
            if (btn) {
                btn.style.display = 'block';
            }
        });
    }

    function showAllOptions() {
        // Mostrar todas las opciones
        optionButtons.forEach(btn => {
            btn.style.display = 'block';
        });
    }

    function shuffleArray(array) {
        // Crear una copia para no modificar el original
        const newArray = [...array];
        
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        
        return newArray;
    }

    // Event listeners
    chatIcon.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', closePopup);
    
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const option = this.getAttribute('data-option');
            handleOption(option);
        });
    });

    // Eliminamos el comportamiento intrusivo
    // No mostramos el chat automáticamente después de un tiempo
    // No mostramos el chat cuando el usuario intenta salir de la página

    // Estilos adicionales para el botón de inscripción (más minimalista)
    const style = document.createElement('style');
    style.textContent = `
        .chat-signup-button {
            display: inline-block;
            padding: 8px 16px;
            background: var(--primary-color);
            color: white;
            text-align: center;
            border-radius: 4px;
            font-weight: 600;
            text-decoration: none;
            margin: 8px 0;
            box-shadow: none;
            transition: all 0.2s ease;
        }
        
        .chat-signup-button:hover {
            transform: translateY(-2px);
            background-color: #78b022;
        }
        
        .signup-container {
            background-color: transparent !important;
            padding: 0 !important;
        }
        
        .typing-indicator {
            display: flex;
            align-items: center;
            column-gap: 4px;
            padding: 10px 15px;
        }
        
        .typing-indicator span {
            height: 8px;
            width: 8px;
            background-color: #ccc;
            border-radius: 50%;
            display: block;
            opacity: 0.7;
            animation: typing 1s infinite;
        }
        
        .typing-indicator span:nth-child(1) {
            animation-delay: 0s;
        }
        
        .typing-indicator span:nth-child(2) {
            animation-delay: 0.3s;
        }
        
        .typing-indicator span:nth-child(3) {
            animation-delay: 0.6s;
        }
        
        @keyframes typing {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(style);
}); 