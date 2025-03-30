/**
 * Testimonial Slider - Maneja la funcionalidad del slider de testimonios
 */
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    let autoplayInterval;

    // Función para inicializar el slider
    function initSlider() {
        if (slides.length === 0) return;
        
        // Ocultar todos los slides primero
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Mostrar el primer slide
        slides[0].classList.add('active');
        
        // Ocultar los controles del slider
        const sliderControls = document.querySelector('.slider-controls');
        if (sliderControls) {
            sliderControls.style.display = 'none';
        }
    }

    // Función para mostrar un slide específico
    function showSlide(index) {
        // Animación de fade out para el slide actual
        slides[currentSlide].style.opacity = '0';
        
        setTimeout(() => {
            // Ocultar todos los slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Mostrar el slide nuevo
            slides[index].classList.add('active');
            slides[index].style.opacity = '1';
            
            // Actualizar el índice actual
            currentSlide = index;
        }, 600);
    }

    // Función para ir al siguiente slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Inicializar el slider
    initSlider();

    // Iniciar autoplay con 7 segundos de intervalo
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 7000);
    }

    // Detener autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Iniciar autoplay al cargar la página
    startAutoplay();

    // Detener autoplay al pasar el mouse por encima
    const sliderContainer = document.querySelector('.testimonial-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoplay);
        sliderContainer.addEventListener('mouseleave', startAutoplay);
    }
});