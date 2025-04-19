// Funcionalidad específica para las preguntas frecuentes (FAQ)
document.addEventListener('DOMContentLoaded', function() {
    console.log('FAQ script loaded');
    
    // Manejo de las preguntas frecuentes
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        console.log('Found ' + faqItems.length + ' FAQ items');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', function() {
                    console.log('FAQ question clicked');
                    
                    // Comprobar si ya está activo
                    const isActive = item.classList.contains('active');
                    
                    // Cerrar todas las preguntas
                    faqItems.forEach(faqItem => {
                        faqItem.classList.remove('active');
                    });
                    
                    // Si no estaba activo, abrirlo
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
        
        // Abrir la primera pregunta por defecto después de cargar la página
        setTimeout(() => {
            faqItems[0].classList.add('active');
            console.log('First FAQ item activated');
        }, 1000);
    }
}); 