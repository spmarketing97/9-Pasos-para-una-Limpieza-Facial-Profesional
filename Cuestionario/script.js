/**
 * Cuestionario - 9 Pasos para una Limpieza Facial Profesional
 */
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const form = document.getElementById('quiz-form');
    const questions = document.querySelectorAll('.question-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const submitButton = document.querySelector('.btn-submit');
    const countdownElement = document.getElementById('countdown');
    const currentYearElement = document.getElementById('current-year');
    const redirectUrl = "https://spmarketing97.github.io/9-Pasos-para-una-Limpieza-Facial-Profesional/";
    
    // Total de preguntas
    const totalQuestions = questions.length - 1; // Restamos 1 por el contenedor de resultados
    
    // Pregunta actual
    let currentQuestion = 1;
    
    // Objeto para almacenar las respuestas del usuario
    let userResponses = {
        timestamp: new Date().toISOString(),
        sessionId: generateSessionId(),
        answers: {}
    };
    
    // Establecer el año actual en el footer
    currentYearElement.textContent = new Date().getFullYear();
    
    // Función para generar un ID de sesión único
    function generateSessionId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    // Función para actualizar la barra de progreso
    function updateProgressBar() {
        const progress = (currentQuestion / totalQuestions) * 100;
        progressBar.style.setProperty('--progress', `${progress}%`);
        progressBar.querySelector('::before').style.width = `${progress}%`;
        progressText.textContent = `${currentQuestion}/${totalQuestions}`;
    }
    
    // Mostrar una pregunta específica
    function showQuestion(questionNumber) {
        // Ocultar todas las preguntas
        questions.forEach(question => {
            question.classList.remove('active');
        });
        
        // Mostrar la pregunta actual
        const targetQuestion = document.querySelector(`[data-question="${questionNumber}"]`);
        if (targetQuestion) {
            targetQuestion.classList.add('active');
        }
        
        // Actualizar la barra de progreso
        progressBar.style.setProperty('--width', `${(questionNumber / totalQuestions) * 100}%`);
        progressText.textContent = `${questionNumber}/${totalQuestions}`;
    }
    
    // Validar que se haya seleccionado una opción
    function validateQuestion(questionNumber) {
        const currentQuestionElement = document.querySelector(`[data-question="${questionNumber}"]`);
        const radioButtons = currentQuestionElement.querySelectorAll('input[type="radio"]');
        let selected = false;
        
        radioButtons.forEach(radio => {
            if (radio.checked) {
                selected = true;
                // Almacenar la respuesta seleccionada
                const questionText = currentQuestionElement.querySelector('h2').textContent;
                const optionText = currentQuestionElement.querySelector(`label[for="${radio.id}"]`).textContent;
                
                userResponses.answers[`q${questionNumber}`] = {
                    question: questionText,
                    answer: optionText,
                    value: radio.value
                };
            }
        });
        
        return selected;
    }
    
    // Event listeners para botones de siguiente
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Verificar si se ha seleccionado una opción
            if (validateQuestion(currentQuestion)) {
                currentQuestion++;
                showQuestion(currentQuestion);
                
                // Actualizar visualmente la barra de progreso
                const progress = (currentQuestion / totalQuestions) * 100;
                progressBar.querySelector(':before').style.width = `${progress}%`;
                
                // Registrar el evento de avance
                logAnalytics('next_question', { 
                    from: currentQuestion - 1, 
                    to: currentQuestion 
                });
            } else {
                // Mostrar mensaje de error si no se ha seleccionado una opción
                alert('Por favor, selecciona una opción para continuar.');
            }
        });
    });
    
    // Event listeners para botones de anterior
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Registrar el evento de retroceso
            logAnalytics('prev_question', { 
                from: currentQuestion, 
                to: currentQuestion - 1 
            });
            
            currentQuestion--;
            showQuestion(currentQuestion);
        });
    });
    
    // Event listener para el botón de enviar
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Verificar si se ha seleccionado una opción en la última pregunta
            if (validateQuestion(currentQuestion)) {
                // Ocultar todas las preguntas
                questions.forEach(question => {
                    question.classList.remove('active');
                });
                
                // Mostrar resultados
                const resultsContainer = document.querySelector('[data-question="results"]');
                if (resultsContainer) {
                    resultsContainer.classList.add('active');
                }
                
                // Almacenar las respuestas en localStorage
                saveUserResponses();
                
                // Enviar datos al servidor para análisis (si está configurado)
                sendResponsesForAnalysis();
                
                // Registrar el evento de envío del cuestionario
                logAnalytics('submit_questionnaire', { 
                    completed: true, 
                    answers_count: Object.keys(userResponses.answers).length 
                });
                
                // Iniciar el contador para la redirección
                let count = 5;
                countdownElement.textContent = count;
                
                const countdownInterval = setInterval(function() {
                    count--;
                    countdownElement.textContent = count;
                    
                    if (count <= 0) {
                        clearInterval(countdownInterval);
                        // Redirigir a la landing page principal
                        window.location.href = redirectUrl;
                    }
                }, 1000);
            } else {
                // Mostrar mensaje de error si no se ha seleccionado una opción
                alert('Por favor, selecciona una opción para continuar.');
            }
        });
    }
    
    // Función para guardar las respuestas en localStorage
    function saveUserResponses() {
        // Añadir tiempo de finalización
        userResponses.completedAt = new Date().toISOString();
        
        // Obtener cuestionarios anteriores o iniciar array vacío
        const previousResponses = JSON.parse(localStorage.getItem('userQuestionnaires') || '[]');
        previousResponses.push(userResponses);
        
        // Guardar en localStorage
        localStorage.setItem('userQuestionnaires', JSON.stringify(previousResponses));
    }
    
    // Función para enviar datos al servidor para análisis
    function sendResponsesForAnalysis() {
        try {
            // Verificar si existe el endpoint para enviar los datos
            const analyticsEndpoint = '/api/questionnaire-analytics';
            
            // Enviar datos mediante fetch API
            fetch(analyticsEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userResponses)
            })
            .catch(error => {
                console.log('Error al enviar datos para análisis:', error);
                // El error se maneja silenciosamente para no afectar la experiencia de usuario
            });
        } catch (error) {
            // Si hay un error, lo registramos pero continuamos con la experiencia del usuario
            console.log('Error en el proceso de envío de datos:', error);
        }
    }
    
    // Función para registrar eventos de análisis
    function logAnalytics(eventName, eventData) {
        // Crear evento de análisis
        const analyticsEvent = {
            event: eventName,
            timestamp: new Date().toISOString(),
            sessionId: userResponses.sessionId,
            ...eventData
        };
        
        // Obtener eventos anteriores o iniciar array vacío
        const previousEvents = JSON.parse(localStorage.getItem('questionnaireEvents') || '[]');
        previousEvents.push(analyticsEvent);
        
        // Guardar en localStorage
        localStorage.setItem('questionnaireEvents', JSON.stringify(previousEvents));
        
        // Enviar al servidor si existe la configuración
        try {
            const analyticsEventEndpoint = '/api/log-event';
            fetch(analyticsEventEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(analyticsEvent)
            }).catch(() => {
                // Silenciosamente manejar errores para no interrumpir la experiencia
            });
        } catch (error) {
            // Error silencioso
        }
    }
    
    // Inicializar el formulario mostrando la primera pregunta
    showQuestion(1);
    
    // Registrar evento de inicio del cuestionario
    logAnalytics('start_questionnaire', { page: window.location.pathname });
    
    // Evento para evitar el envío normal del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
    });
    
    // Corregir el comportamiento de la barra de progreso
    const allQuestions = document.querySelectorAll('.question-container:not([data-question="results"])');
    progressBar.style.setProperty('--width', `${(1 / allQuestions.length) * 100}%`);
    
    // Actualizar la barra de progreso cuando se cargue la página
    document.querySelectorAll('[data-question="1"]')[0].classList.add('active');
    progressBar.querySelector('::before').style.width = `${(1 / totalQuestions) * 100}%`;
}); 