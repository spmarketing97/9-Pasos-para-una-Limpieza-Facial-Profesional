/**
 * Testimonial Slider - Carrusel automático cada 10 segundos con efecto de desaparición
 */
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    let autoplayInterval;
    let isTransitioning = false;
    
    console.log("Testimonial slider iniciado - " + slides.length + " testimonios encontrados");

    // Configuración inicial del slider
    function initSlider() {
        if (slides.length === 0) {
            console.log("No se encontraron testimonios");
            return;
        }
        
        console.log("Inicializando slider de testimonios");
        
        // Configurar todos los slides inicialmente
        slides.forEach((slide, index) => {
            // Establecer estilos básicos
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
            slide.style.height = '100%';
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
            slide.style.transition = 'opacity 0.8s ease';
            slide.style.zIndex = '1';
            
            // Ocultar todos excepto el primero
            if (index === 0) {
                slide.style.opacity = '1';
                slide.style.visibility = 'visible';
                slide.style.zIndex = '2';
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Configurar botones de navegación manual
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        
        if (prevButton) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (!isTransitioning) {
                    console.log("Botón anterior pulsado");
                    stopAutoplay();
                    showPrevSlide();
                    startAutoplay();
                }
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (!isTransitioning) {
                    console.log("Botón siguiente pulsado");
                    stopAutoplay();
                    showNextSlide();
                    startAutoplay();
                }
            });
        }
    }

    // Mostrar un slide específico con efecto de desaparecer
    function showSlide(index) {
        if (isTransitioning || index === currentSlide) return;
        
        isTransitioning = true;
        console.log("Cambiando al testimonio " + (index + 1));
        
        // Ocultar el slide actual (efecto desaparecer)
        slides[currentSlide].style.opacity = '0';
        
        setTimeout(() => {
            slides[currentSlide].style.visibility = 'hidden';
            slides[currentSlide].style.zIndex = '1';
            slides[currentSlide].classList.remove('active');
            
            // Actualizar el índice actual
            currentSlide = index;
            
            // Mostrar el nuevo slide
            slides[currentSlide].style.visibility = 'visible';
            slides[currentSlide].style.zIndex = '2';
            slides[currentSlide].classList.add('active');
            
            setTimeout(() => {
                slides[currentSlide].style.opacity = '1';
                
                // Terminar transición
                setTimeout(() => {
                    isTransitioning = false;
                }, 800);
            }, 50);
        }, 800);
    }

    // Pasar al siguiente slide
    function showNextSlide() {
        if (isTransitioning) return;
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Volver al slide anterior
    function showPrevSlide() {
        if (isTransitioning) return;
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Iniciar el autoplay a 10 segundos
    function startAutoplay() {
        console.log("Iniciando autoplay de testimonios - 10 segundos por testimonio");
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
        autoplayInterval = setInterval(function() {
            if (!isTransitioning) {
                console.log("Cambiando testimonio automáticamente");
                showNextSlide();
            }
        }, 10000);
    }

    // Detener el autoplay
    function stopAutoplay() {
        console.log("Deteniendo autoplay de testimonios");
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // Inicializar y comenzar
    initSlider();
    startAutoplay();

    // Eventos para pausar/reanudar al interactuar
    const sliderContainer = document.querySelector('.testimonial-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoplay);
        sliderContainer.addEventListener('mouseleave', startAutoplay);
        sliderContainer.addEventListener('touchstart', stopAutoplay, {passive: true});
        sliderContainer.addEventListener('touchend', startAutoplay, {passive: true});
    }
    
    // Reiniciar autoplay cuando la página vuelve a obtener foco
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            console.log("Página visible - reiniciando autoplay");
            stopAutoplay(); // Asegurarnos de limpiar el intervalo anterior
            setTimeout(startAutoplay, 1000); // Pequeño retraso para evitar problemas
        } else {
            console.log("Página oculta - pausando autoplay");
            stopAutoplay();
        }
    });
    
    // Forzar el funcionamiento incluso con cambios en la página
    window.addEventListener('load', function() {
        stopAutoplay();
        setTimeout(startAutoplay, 1000);
    });
    
    window.addEventListener('focus', function() {
        stopAutoplay();
        setTimeout(startAutoplay, 1000);
    });
    
    window.addEventListener('blur', stopAutoplay);
    
    window.addEventListener('resize', function() {
        stopAutoplay();
        setTimeout(startAutoplay, 1000);
    });
    
    // Verificar cada minuto si el autoplay sigue funcionando (como respaldo)
    setInterval(function() {
        if (!autoplayInterval) {
            console.log("Restaurando autoplay (verificación de seguridad)");
            startAutoplay();
        }
    }, 60000);
});