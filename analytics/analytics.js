/**
 * Sistema de Análisis para 9 Pasos para una Limpieza Facial Profesional
 * 
 * Este script realiza seguimiento de:
 * - Vistas de página
 * - Clics en botones
 * - Eventos de scroll
 * - Interacciones con el video
 * - Acciones en el cuestionario
 */

// Configuración global
const Analytics = {
    // ID único para esta sesión del usuario
    sessionId: generateSessionId(),
    
    // Inicio de sesión timestamp
    sessionStart: new Date().toISOString(),
    
    // URL actual
    currentPage: window.location.pathname,
    
    // Determinar si estamos en la landing o en el cuestionario
    isQuestionnaireSection: window.location.pathname.includes('Cuestionario'),
    
    // Eventos registrados durante esta sesión
    events: [],
    
    // Contador de eventos
    eventCount: 0,
    
    // Configuración de servidor (ficticio - para implementación futura)
    serverEndpoint: '/api/analytics',
    
    // Estado de consentimiento de cookies
    hasConsent: localStorage.getItem('cookieConsent') === 'accepted',
    
    // Inicializar el sistema de analytics
    init: function() {
        // Solo proceder si hay consentimiento de cookies
        if (!this.hasConsent && localStorage.getItem('cookieConsent') !== null) {
            console.log('Analytics desactivado: el usuario no ha dado consentimiento');
            return;
        }
        
        // Registrar vista de página
        this.trackPageView();
        
        // Configurar escuchadores de eventos
        this.setupEventListeners();
        
        // Enviar datos existentes en localStorage si los hay
        this.processPendingEvents();
        
        // Configurar envío periódico
        this.setupPeriodicSync();
        
        console.log('Sistema de Analytics inicializado correctamente');
    },
    
    // Configurar escuchadores para eventos comunes
    setupEventListeners: function() {
        // Evento de scroll
        let lastScrollPosition = 0;
        let scrollThreshold = 25; // Porcentaje
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrollPosition / docHeight) * 100;
            
            // Registrar scroll cada 25%
            if (Math.floor(scrollPercentage / scrollThreshold) > Math.floor(lastScrollPosition / scrollThreshold)) {
                this.trackEvent('scroll', {
                    percentage: Math.floor(scrollPercentage / scrollThreshold) * scrollThreshold
                });
            }
            
            lastScrollPosition = scrollPercentage;
        });
        
        // Clics en botones
        document.addEventListener('click', (event) => {
            let target = event.target;
            
            // Buscar el botón o enlace más cercano (podría haber hecho clic en un hijo)
            while (target && target !== document) {
                if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.classList.contains('btn')) {
                    const buttonText = target.textContent.trim();
                    const buttonHref = target.getAttribute('href');
                    const buttonClasses = Array.from(target.classList).join(' ');
                    
                    this.trackEvent('button_click', {
                        text: buttonText,
                        href: buttonHref || 'none',
                        classes: buttonClasses
                    });
                    
                    break;
                }
                target = target.parentElement;
            }
        });
        
        // Eventos específicos de la página principal
        if (!this.isQuestionnaireSection) {
            this.setupMainPageEvents();
        }
        
        // Eventos para la página del cuestionario
        if (this.isQuestionnaireSection) {
            this.setupQuestionnaireEvents();
        }
        
        // Registrar tiempo antes de salir
        window.addEventListener('beforeunload', () => {
            const sessionDuration = (new Date() - new Date(this.sessionStart)) / 1000;
            this.trackEvent('session_end', {
                duration_seconds: sessionDuration,
                event_count: this.eventCount
            });
            
            // Intentar enviar datos sincronizados antes de salir
            this.syncData(true);
        });
    },
    
    // Configurar eventos específicos para la página principal
    setupMainPageEvents: function() {
        // Seguimiento de reproducciones de video
        const video = document.getElementById('banner-video');
        if (video) {
            video.addEventListener('play', () => {
                this.trackEvent('video_play', {
                    video_id: 'banner-video',
                    position: video.currentTime
                });
            });
            
            video.addEventListener('pause', () => {
                this.trackEvent('video_pause', {
                    video_id: 'banner-video',
                    position: video.currentTime
                });
            });
            
            video.addEventListener('ended', () => {
                this.trackEvent('video_complete', {
                    video_id: 'banner-video'
                });
            });
            
            // Registrar cuando se ve un cuarto, la mitad, tres cuartos del video
            video.addEventListener('timeupdate', () => {
                const percent = Math.floor((video.currentTime / video.duration) * 100);
                
                if (percent >= 25 && percent < 26 && !video.dataset.reached25) {
                    video.dataset.reached25 = true;
                    this.trackEvent('video_progress', {
                        video_id: 'banner-video',
                        percent: 25
                    });
                }
                
                if (percent >= 50 && percent < 51 && !video.dataset.reached50) {
                    video.dataset.reached50 = true;
                    this.trackEvent('video_progress', {
                        video_id: 'banner-video',
                        percent: 50
                    });
                }
                
                if (percent >= 75 && percent < 76 && !video.dataset.reached75) {
                    video.dataset.reached75 = true;
                    this.trackEvent('video_progress', {
                        video_id: 'banner-video',
                        percent: 75
                    });
                }
            });
        }
        
        // Seguimiento de interacciones con los módulos del curso
        const moduleElements = document.querySelectorAll('.modulo-minimalista h3');
        moduleElements.forEach((moduleHeader, index) => {
            moduleHeader.addEventListener('click', () => {
                const moduleName = moduleHeader.textContent.trim();
                this.trackEvent('module_click', {
                    module_index: index + 1,
                    module_name: moduleName
                });
            });
        });
        
        // Seguimiento de interacciones con testimonios
        const testimonialControls = document.querySelectorAll('.slider-controls button');
        testimonialControls.forEach(button => {
            button.addEventListener('click', () => {
                const direction = button.classList.contains('next-button') ? 'next' : 'prev';
                this.trackEvent('testimonial_navigation', {
                    direction: direction
                });
            });
        });
        
        // Seguimiento del contador de tiempo limitado
        const countdownTimer = document.getElementById('header-countdown');
        if (countdownTimer) {
            // Registrar cuando el contador llega a ciertos umbrales
            const checkCountdown = setInterval(() => {
                const timeText = countdownTimer.textContent;
                const match = timeText.match(/(\d+):(\d+)/);
                
                if (match) {
                    const minutes = parseInt(match[1]);
                    
                    if (minutes === 15 && !countdownTimer.dataset.reached15) {
                        countdownTimer.dataset.reached15 = true;
                        this.trackEvent('countdown_threshold', { minutes: 15 });
                    }
                    
                    if (minutes === 5 && !countdownTimer.dataset.reached5) {
                        countdownTimer.dataset.reached5 = true;
                        this.trackEvent('countdown_threshold', { minutes: 5 });
                    }
                    
                    if (minutes === 1 && !countdownTimer.dataset.reached1) {
                        countdownTimer.dataset.reached1 = true;
                        this.trackEvent('countdown_threshold', { minutes: 1 });
                    }
                    
                    if (minutes === 0 && !countdownTimer.dataset.reached0) {
                        countdownTimer.dataset.reached0 = true;
                        this.trackEvent('countdown_ended', {});
                        clearInterval(checkCountdown);
                    }
                }
            }, 1000);
        }
    },
    
    // Configurar eventos específicos para el cuestionario
    setupQuestionnaireEvents: function() {
        // Seguimiento de navegación entre preguntas
        const nextButtons = document.querySelectorAll('.btn-next');
        const prevButtons = document.querySelectorAll('.btn-prev');
        const submitButton = document.querySelector('.btn-submit');
        
        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                const container = button.closest('.question-container');
                if (!container) return;
                
                const questionNumber = parseInt(container.getAttribute('data-question'));
                const questionText = container.querySelector('h2').textContent;
                
                // Buscar respuesta seleccionada
                const selectedRadio = container.querySelector('input[type="radio"]:checked');
                let selectedAnswer = null;
                
                if (selectedRadio) {
                    const optionLabel = container.querySelector(`label[for="${selectedRadio.id}"]`);
                    selectedAnswer = optionLabel ? optionLabel.textContent : null;
                }
                
                this.trackEvent('question_next', {
                    question_number: questionNumber,
                    question_text: questionText,
                    selected_answer: selectedAnswer
                });
            });
        });
        
        prevButtons.forEach(button => {
            button.addEventListener('click', () => {
                const container = button.closest('.question-container');
                if (!container) return;
                
                const questionNumber = parseInt(container.getAttribute('data-question'));
                
                this.trackEvent('question_prev', {
                    from_question: questionNumber
                });
            });
        });
        
        if (submitButton) {
            submitButton.addEventListener('click', () => {
                const container = submitButton.closest('.question-container');
                if (!container) return;
                
                const questionNumber = parseInt(container.getAttribute('data-question'));
                
                // Capturar todas las respuestas para incluir en el evento de envío
                const allAnswers = {};
                document.querySelectorAll('.question-container').forEach(questionContainer => {
                    const qNum = questionContainer.getAttribute('data-question');
                    if (qNum === 'results') return;
                    
                    const selectedRadio = questionContainer.querySelector('input[type="radio"]:checked');
                    if (selectedRadio) {
                        const optionLabel = questionContainer.querySelector(`label[for="${selectedRadio.id}"]`);
                        allAnswers[`q${qNum}`] = optionLabel ? optionLabel.textContent : null;
                    }
                });
                
                this.trackEvent('questionnaire_submit', {
                    answers: allAnswers
                });
            });
        }
    },
    
    // Registrar vista de página
    trackPageView: function() {
        this.trackEvent('page_view', {
            page: this.currentPage,
            referrer: document.referrer || 'direct',
            title: document.title
        });
    },
    
    // Registrar un evento genérico
    trackEvent: function(eventName, eventData = {}) {
        // Incrementar contador de eventos
        this.eventCount++;
        
        const event = {
            event_id: `${this.sessionId}-${this.eventCount}`,
            event_name: eventName,
            timestamp: new Date().toISOString(),
            session_id: this.sessionId,
            page: this.currentPage,
            data: eventData
        };
        
        // Añadir a la lista de eventos
        this.events.push(event);
        
        // Si es un evento importante, intentar sincronizar inmediatamente
        const importantEvents = ['questionnaire_submit', 'session_end', 'page_view', 'button_click'];
        if (importantEvents.includes(eventName)) {
            this.syncData();
        }
        
        // Almacenar en localStorage como copia de seguridad
        this.persistEvent(event);
        
        return event;
    },
    
    // Persistir evento en localStorage
    persistEvent: function(event) {
        const storedEvents = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
        storedEvents.push(event);
        
        // Limitar a los últimos 200 eventos para evitar exceder la capacidad
        if (storedEvents.length > 200) {
            storedEvents.splice(0, storedEvents.length - 200);
        }
        
        localStorage.setItem('analyticsEvents', JSON.stringify(storedEvents));
    },
    
    // Sincronizar datos con el servidor (enviar eventos acumulados)
    syncData: function(isFinalSync = false) {
        if (!this.hasConsent) return;
        
        // Si no hay eventos, no hacer nada
        if (this.events.length === 0) return;
        
        // Crear una copia de los eventos actuales
        const eventsToSync = [...this.events];
        
        // En una implementación real, aquí enviaríamos los datos al servidor:
        const dataToSend = {
            session_id: this.sessionId,
            is_final_sync: isFinalSync,
            timestamp: new Date().toISOString(),
            events: eventsToSync,
            url: window.location.href,
            user_agent: navigator.userAgent
        };
        
        // Simulamos el envío (en una implementación real sería un fetch o XMLHttpRequest)
        console.log('Analytics: sincronizando eventos', dataToSend);
        
        // Limpiar los eventos que se han sincronizado
        this.events = this.events.filter(event => !eventsToSync.includes(event));
        
        // Actualizar la URL actual (por si ha cambiado)
        this.currentPage = window.location.pathname;
    },
    
    // Procesar eventos pendientes de localStorage
    processPendingEvents: function() {
        const pendingEvents = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
        
        // Si hay eventos pendientes, intentar enviarlos
        if (pendingEvents.length > 0) {
            console.log(`Analytics: procesando ${pendingEvents.length} eventos pendientes`);
            
            // En una implementación real, aquí enviaríamos los eventos pendientes al servidor
            
            // Limpiar después de procesar
            localStorage.removeItem('analyticsEvents');
        }
    },
    
    // Configurar sincronización periódica
    setupPeriodicSync: function() {
        // Sincronizar cada 30 segundos
        setInterval(() => {
            this.syncData();
        }, 30000);
    }
};

// Generar ID de sesión único
function generateSessionId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Inicializar analytics cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    Analytics.init();
}); 