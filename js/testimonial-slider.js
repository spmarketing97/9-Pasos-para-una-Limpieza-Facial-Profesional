/**
 * Testimonial Slider - Maneja la funcionalidad del slider de testimonios
 */
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentSlide = 0;
    let autoplayInterval;

    // Función para inicializar el slider
    function initSlider() {
        if (slides.length === 0) return;
        
        // Ocultar todos los slides primero
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Mostrar el primer slide
        slides[0].style.display = 'block';
        slides[0].classList.add('active');
    }

    // Función para mostrar un slide específico
    function showSlide(index) {
        // Ocultar todos los slides
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        
        // Mostrar el slide actual
        slides[index].style.display = 'block';
        slides[index].classList.add('active');
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

    // Inicializar el slider
    initSlider();

    // Asignar eventos a los botones
    if (nextButton && prevButton) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
    }

    // Iniciar autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
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