// Script de inicialización para asegurar que las FAQ funcionen
(function() {
    // Función para inicializar las FAQ
    function initFAQ() {
        console.log("Initializing FAQ functionality");
        
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length === 0) {
            console.log("No FAQ items found");
            // Intentar de nuevo en 500ms
            setTimeout(initFAQ, 500);
            return;
        }
        
        console.log("Found " + faqItems.length + " FAQ items");
        
        // Configurar los eventos de clic
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                // Eliminar eventos previos para evitar duplicación
                const newQuestion = question.cloneNode(true);
                question.parentNode.replaceChild(newQuestion, question);
                
                newQuestion.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log("FAQ clicked:", this.textContent.trim());
                    
                    // Comprobar si ya está activo
                    const isActive = item.classList.contains('active');
                    
                    // Primero, cerrar todas las preguntas
                    faqItems.forEach(faqItem => {
                        faqItem.classList.remove('active');
                    });
                    
                    // Luego, si no estaba activo, abrirlo
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
        
        // Abrir la primera pregunta por defecto
        if (faqItems.length > 0 && !faqItems[0].classList.contains('active')) {
            faqItems[0].classList.add('active');
            console.log("First FAQ item activated");
        }
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFAQ);
    } else {
        initFAQ();
    }
    
    // Ejecutar también después de la carga completa de la página
    window.addEventListener('load', initFAQ);
    
    // Y una vez más después de un segundo, para asegurarse
    setTimeout(initFAQ, 1000);
})(); 