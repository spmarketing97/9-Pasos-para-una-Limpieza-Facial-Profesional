/**
 * Testimonial Slider - Carrusel automático cada 10 segundos con efecto de desaparición
 * Versión mejorada para avance automático sin controles manuales
 */
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    const slides = document.querySelectorAll('.testimonial-slide');
    const sliderContainer = document.querySelector('.testimonial-slider');
    let currentSlide = 0;
    let autoplayInterval;
    let isTransitioning = false;
    
    console.log("Testimonial slider iniciado - " + slides.length + " testimonios encontrados");

    // Verificación de existencia de testimonios
    if (slides.length === 0) {
        console.error("ALERTA: No se encontraron testimonios");
        return;
    }
    
    // Asegurarse que el contenedor sea visible
    if (sliderContainer) {
        sliderContainer.style.display = 'block';
        sliderContainer.style.position = 'relative';
        sliderContainer.style.zIndex = '2';
        sliderContainer.style.overflow = 'visible';
    }

    // Configuración inicial del slider
    function initSlider() {
        console.log("Inicializando slider de testimonios - modo automático");
        
        // Aplicar estilos al contenedor
        document.querySelector('#testimonios').style.zIndex = '1';
        
        // Ocultar los controles manuales ya que no son necesarios
        const controls = document.querySelector('.slider-controls');
        if (controls) {
            controls.style.display = 'none';
        }
        
        // Configurar todos los slides inicialmente
        slides.forEach((slide, index) => {
            // Establecer estilos básicos
            slide.style.display = 'block';
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
                console.log("Slide activo: ", index);
            } else {
                slide.classList.remove('active');
            }
        });
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
        }, 10000); // Exactamente 10 segundos por testimonio
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
        console.log("Página cargada - reiniciando slider");
        // Forzar a mostrar el slider en caso de problemas
        document.querySelector('.testimonial-slider').style.display = 'block';
        document.querySelector('.testimonial-slider').style.overflow = 'visible';
        
        // Ocultar los controles
        const controls = document.querySelector('.slider-controls');
        if (controls) {
            controls.style.display = 'none';
        }
        
        // Forzar a mostrar al menos un testimonio
        if (slides[0]) {
            slides[0].style.opacity = '1';
            slides[0].style.visibility = 'visible';
            slides[0].style.zIndex = '2';
            slides[0].classList.add('active');
        }
        
        stopAutoplay();
        setTimeout(startAutoplay, 1000);
    });
    
    window.addEventListener('focus', function() {
        stopAutoplay();
        setTimeout(startAutoplay, 1000);
    });
    
    window.addEventListener('blur', stopAutoplay);
    
    window.addEventListener('resize', function() {
        // Ocultar controles al redimensionar
        const controls = document.querySelector('.slider-controls');
        if (controls) {
            controls.style.display = 'none';
        }
        
        stopAutoplay();
        setTimeout(startAutoplay, 1000);
    });
    
    // Verificar cada 5 segundos el estado del slider
    setInterval(function() {
        if (!autoplayInterval) {
            console.log("Restaurando autoplay (verificación de seguridad)");
            startAutoplay();
        }
        
        // Verificar si hay testimonios visibles, si no, mostrar el primero
        let visibleSlide = document.querySelector('.testimonial-slide.active');
        if (!visibleSlide || getComputedStyle(visibleSlide).opacity === '0') {
            console.log("Ningún testimonio visible - mostrando el primero");
            slides.forEach((slide, index) => {
                if (index === 0) {
                    slide.style.opacity = '1';
                    slide.style.visibility = 'visible';
                    slide.style.zIndex = '2';
                    slide.classList.add('active');
                    currentSlide = 0;
                } else {
                    slide.style.opacity = '0';
                    slide.style.visibility = 'hidden';
                    slide.style.zIndex = '1';
                    slide.classList.remove('active');
                }
            });
        }
    }, 5000);
});