/**
 * Contador regresivo para landing page
 * - Inicia con 25 minutos
 * - Se reinicia al abrir en modo incógnito, borrar cookies o después de 5 días
 * - Cuando llega a cero, se queda en cero durante 5 días
 */
document.addEventListener('DOMContentLoaded', function() {
    // Constantes
    const INITIAL_MINUTES = 25;
    const INITIAL_SECONDS = 0;
    const TOTAL_INITIAL_TIME = INITIAL_MINUTES * 60 + INITIAL_SECONDS; // Tiempo total en segundos
    const COOKIE_NAME = 'countdown_timer';
    const EXPIRY_DAYS = 5; // Días para reiniciar el contador
    const ZERO_COOKIE_NAME = 'countdown_reached_zero';
    
    // Elementos del DOM
    const headerMinutesEl = document.getElementById('header-minutes');
    const headerSecondsEl = document.getElementById('header-seconds');
    const headerCountdownEl = document.getElementById('header-countdown');
    
    // Variables para el contador
    let timeLeft; // Tiempo restante en segundos
    let countdownInterval; // Referencia al intervalo del contador
    
    // Función para establecer una cookie
    function setCookie(name, value, days) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + days);
        const cookieValue = encodeURIComponent(value) + '; expires=' + expiryDate.toUTCString() + '; path=/; SameSite=Strict';
        document.cookie = name + '=' + cookieValue;
    }
    
    // Función para obtener el valor de una cookie
    function getCookie(name) {
        const nameEQ = name + '=';
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
            }
        }
        return null;
    }
    
    // Función para actualizar la visualización del contador
    function updateCountdownDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        // Actualizar elementos en la cabecera
        headerMinutesEl.textContent = minutes.toString().padStart(2, '0');
        headerSecondsEl.textContent = seconds.toString().padStart(2, '0');
        
        // Añadir clase urgente cuando queden menos de 5 minutos
        if (timeLeft <= 300 && timeLeft > 0) {
            headerCountdownEl.classList.add('urgent');
        } else {
            headerCountdownEl.classList.remove('urgent');
        }
        
        // Guardar el tiempo restante en la cookie
        setCookie(COOKIE_NAME, timeLeft, EXPIRY_DAYS);
    }
    
    // Función para iniciar el contador
    function startCountdown() {
        // Primero detener cualquier intervalo existente
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        
        // Verificar si el contador ha llegado a cero previamente
        const reachedZero = getCookie(ZERO_COOKIE_NAME);
        
        // Si ya ha llegado a cero y no han pasado los 5 días, mantenerlo en cero
        if (reachedZero === 'true' && timeLeft <= 0) {
            updateCountdownDisplay();
            return;
        }
        
        // Iniciar el intervalo de actualización
        countdownInterval = setInterval(function() {
            if (timeLeft > 0) {
                timeLeft--;
                updateCountdownDisplay();
                
                // Si llega a cero, marcar la cookie de que ha llegado a cero
                if (timeLeft === 0) {
                    setCookie(ZERO_COOKIE_NAME, 'true', EXPIRY_DAYS);
                    // Detener el intervalo pero mantener el valor en la cookie
                    clearInterval(countdownInterval);
                }
            }
        }, 1000);
    }
    
    // Función para inicializar el contador
    function initializeCountdown() {
        // Verificar si ya existe una cookie con el tiempo
        const savedTime = getCookie(COOKIE_NAME);
        const reachedZero = getCookie(ZERO_COOKIE_NAME);
        
        if (savedTime !== null) {
            // Si hay tiempo guardado, usarlo
            timeLeft = parseInt(savedTime, 10);
        } else {
            // Si no hay tiempo guardado, iniciar con el tiempo predeterminado
            timeLeft = TOTAL_INITIAL_TIME;
        }
        
        // Si ha llegado a cero y no han pasado los 5 días, mantenerlo en cero
        if (reachedZero === 'true' && timeLeft <= 0) {
            timeLeft = 0;
        }
        
        // Actualizar la visualización inicial
        updateCountdownDisplay();
        
        // Iniciar el contador
        startCountdown();
    }
    
    // Inicializar el contador
    initializeCountdown();
});