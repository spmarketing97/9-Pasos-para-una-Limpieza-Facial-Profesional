// Script directo para las FAQ que se ejecuta inmediatamente
document.addEventListener('DOMContentLoaded', function() {
    // Código para añadir funcionalidad al hacer clic en las preguntas
    const initFaqSystem = function() {
        console.log('FAQ direct script executing');
        
        // Seleccionar todos los elementos de preguntas
        const faqQuestions = document.querySelectorAll('.js-faq-question');
        
        if (faqQuestions.length === 0) {
            console.log('No FAQ questions found with js-faq-question class. Retrying in 500ms.');
            setTimeout(initFaqSystem, 500);
            return;
        }
        
        console.log('Found ' + faqQuestions.length + ' FAQ questions');
        
        // Añadir evento de clic a cada pregunta
        faqQuestions.forEach(function(question) {
            question.addEventListener('click', function() {
                const faqItem = this.parentNode;
                const isActive = faqItem.classList.contains('active');
                
                // Cerrar todas las preguntas abiertas
                document.querySelectorAll('.faq-item').forEach(function(item) {
                    item.classList.remove('active');
                });
                
                // Si esta pregunta no estaba activa, activarla
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
        
        // Abrir la primera pregunta automáticamente
        if (faqQuestions.length > 0) {
            const firstItem = faqQuestions[0].parentNode;
            if (!firstItem.classList.contains('active')) {
                firstItem.classList.add('active');
            }
        }
    };
    
    // Ejecutar el sistema de FAQ
    initFaqSystem();
    
    // Reejecutar después de 1 segundo para asegurarse
    setTimeout(initFaqSystem, 1000);
}); 