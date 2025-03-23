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
    
    // Acordeón para los módulos del curso
    const moduleHeaders = document.querySelectorAll('.module-header');
    
    moduleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const module = this.parentElement;
            
            // Cierra todos los módulos activos
            const activeModules = document.querySelectorAll('.module.active');
            activeModules.forEach(activeModule => {
                if (activeModule !== module) {
                    activeModule.classList.remove('active');
                }
            });
            
            // Alterna el estado del módulo actual
            module.classList.toggle('active');
            
            // Cambia el ícono
            const icon = this.querySelector('.toggle-icon i');
            if (module.classList.contains('active')) {
                icon.className = 'fas fa-minus';
            } else {
                icon.className = 'fas fa-plus';
            }
        });
    });
    
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

    // Slider de testimonios
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentSlide = 0;

    // Mostrar el primer slide al cargar
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    // Función para mostrar un slide específico
    function showSlide(index) {
        // Ocultar todos los slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        
        // Mostrar el slide actual
        slides[index].classList.add('active');
        slides[index].style.display = 'block';
    }

    // Función para ir al siguiente slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Función para ir al slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Asignar eventos a los botones
    if (nextButton && prevButton) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
    }

    // Autoplay opcional del slider (cada 5 segundos)
    const autoplayInterval = setInterval(nextSlide, 5000);

    // Detener autoplay al pasar el mouse por encima
    const sliderContainer = document.querySelector('.testimonial-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', function() {
            clearInterval(autoplayInterval);
        });
    }
}); 