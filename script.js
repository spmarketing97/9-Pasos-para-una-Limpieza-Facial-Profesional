// Inicialización de AOS (Animaciones al hacer scroll)
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
});

// Contador regresivo y manejo de cookies
document.addEventListener('DOMContentLoaded', function() {
    // Configuración del contador: 25 minutos en segundos
    const COUNTDOWN_DURATION = 25 * 60;
    
    // Referencias a elementos del DOM
    const headerMinutes = document.getElementById('header-minutes');
    const headerSeconds = document.getElementById('header-seconds');
    const footerMinutes = document.getElementById('footer-minutes');
    const footerSeconds = document.getElementById('footer-seconds');
    const headerCountdown = document.getElementById('header-countdown');
    const footerCountdown = document.getElementById('footer-countdown');
    const currentYearSpan = document.getElementById('current-year');
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    
    // Funcionalidad de menú toggle para móviles
    if (navbarToggle && navbarLinks) {
        navbarToggle.addEventListener('click', function() {
            navbarLinks.classList.toggle('active');
            const isOpen = navbarLinks.classList.contains('active');
            navbarToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Cerrar menú cuando se hace clic en cualquier enlace
        const navLinks = navbarLinks.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Solo cerrar si el menú está abierto (clase active presente)
                if (navbarLinks.classList.contains('active')) {
                    navbarLinks.classList.remove('active');
                    navbarToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
    
    // Cambio de estilo del navbar al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Variables para el contador
    let countdownTime;
    let countdownInterval;
    
    // Función para establecer el año actual en el footer
    function setCurrentYear() {
        const now = new Date();
        currentYearSpan.textContent = now.getFullYear();
    }
    
    // Actualizar el año actual
    setCurrentYear();
    
    // Función para guardar el tiempo restante en cookies
    function saveCountdownTime(time) {
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 días
        document.cookie = `countdownTime=${time};expires=${expiryDate.toUTCString()};path=/`;
    }
    
    // Función para leer el tiempo restante de las cookies
    function getCountdownTime() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('countdownTime=')) {
                return parseInt(cookie.substring('countdownTime='.length), 10);
            }
        }
        return null;
    }
    
    // Función para formatear el tiempo (añadir ceros a la izquierda)
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    
    // Función para actualizar la visualización del contador
    function updateCountdownDisplay() {
        const minutes = Math.floor(countdownTime / 60);
        const seconds = countdownTime % 60;
        
        // Actualiza ambos contadores (cabecera y footer)
        headerMinutes.textContent = formatTime(minutes);
        headerSeconds.textContent = formatTime(seconds);
        footerMinutes.textContent = formatTime(minutes);
        footerSeconds.textContent = formatTime(seconds);
        
        // Añade clase de urgencia cuando queden menos de 5 minutos
        if (countdownTime <= 300) {
            headerCountdown.classList.add('urgent');
            footerCountdown.classList.add('urgent');
        } else {
            headerCountdown.classList.remove('urgent');
            footerCountdown.classList.remove('urgent');
        }
    }
    
    // Función para iniciar el contador
    function startCountdown() {
        // Comprueba si hay un contador guardado en cookies
        const savedTime = getCountdownTime();
        
        // Si hay tiempo guardado y es válido, lo usamos; de lo contrario, comenzamos desde el principio
        if (savedTime && savedTime > 0 && savedTime <= COUNTDOWN_DURATION) {
            countdownTime = savedTime;
        } else {
            countdownTime = COUNTDOWN_DURATION;
        }
        
        // Actualiza la visualización inicial
        updateCountdownDisplay();
        
        // Inicia el intervalo para el conteo regresivo
        countdownInterval = setInterval(function() {
            countdownTime--;
            
            if (countdownTime <= 0) {
                // Cuando llega a cero, reinicia el contador
                countdownTime = COUNTDOWN_DURATION;
                
                // Elimina la clase de urgencia
                headerCountdown.classList.remove('urgent');
                footerCountdown.classList.remove('urgent');
            }
            
            // Actualiza la visualización y guarda en cookies
            updateCountdownDisplay();
            saveCountdownTime(countdownTime);
        }, 1000);
    }
    
    // Acción de scroll para el contador de la cabecera
    window.addEventListener('scroll', function() {
        const countdownSticky = document.querySelector('.countdown-sticky');
        const scrollPosition = window.scrollY;
        
        // Cuando el usuario hace scroll, ajustamos la opacidad del contador
        if (scrollPosition > 200) {
            countdownSticky.style.opacity = '0.9';
        } else {
            countdownSticky.style.opacity = '1';
        }
    });
    
    // Inicia el contador
    startCountdown();
    
    // La implementación del acordeón se ha movido a js/accordion.js
    // para mejorar la organización del código y evitar conflictos

    
    // Animación para números en contador de precio
    const animateCountUp = () => {
        const countElements = document.querySelectorAll('.count-up');
        
        countElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-target'));
            const count = parseInt(element.innerText);
            const speed = 50; // Velocidad de la animación
            
            if (count < target) {
                element.innerText = Math.ceil(count + target / speed);
                setTimeout(() => animateCountUp(), 1);
            } else {
                element.innerText = target;
            }
        });
    };
    
    // Navegación suave para enlaces de anclaje
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Manejo de la sección de preguntas frecuentes (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question) {
                question.addEventListener('click', () => {
                    // Comprobar si el elemento actual está activo
                    const isActive = item.classList.contains('active');
                    
                    // Cerrar todas las preguntas abiertas
                    faqItems.forEach(faqItem => {
                        faqItem.classList.remove('active');
                    });
                    
                    // Si el elemento no estaba activo, abrirlo
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
        
        // Activar la primera pregunta por defecto
        if (faqItems.length > 0) {
            faqItems[0].classList.add('active');
        }
    }
    
    // Efecto paralaje para el banner
    const banner = document.querySelector('.banner-img');
    if (banner) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            banner.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        });
    }
    
    // Animación de aparición para elementos cuando se hacen visibles
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Iniciar la primera animación de elementos y luego en scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Efecto de brillo para botones principales
    const primaryButtons = document.querySelectorAll('.btn-primary');
    
    primaryButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.classList.add('shine');
        });
        
        button.addEventListener('mouseout', function() {
            this.classList.remove('shine');
        });
    });
    
    // Efecto de pulsación para CTA principal
    const pulsateButtons = document.querySelectorAll('.btn-lg.btn-primary');
    
    pulsateButtons.forEach(button => {
        setInterval(() => {
            button.classList.add('pulsate');
            
            setTimeout(() => {
                button.classList.remove('pulsate');
            }, 1000);
        }, 3000);
    });

    // La funcionalidad del slider de testimonios se ha movido a js/testimonial-slider.js
    // para mejorar la organización del código y evitar conflictos

    // Flecha volver arriba
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        const header = document.querySelector('.header');
        header.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});