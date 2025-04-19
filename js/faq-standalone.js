/**
 * Script independiente para el acordeón de preguntas frecuentes
 * Este script se ejecuta inmediatamente y configura el acordeón de FAQ
 */

// Función autoejecutada para evitar conflictos
(function() {
    // Función principal para activar las FAQ
    function setupFAQ() {
        // Seleccionar todos los elementos FAQ
        var faqItems = document.querySelectorAll('.faq-item');
        
        // Si no hay elementos, salir
        if (!faqItems || faqItems.length === 0) {
            console.log('No se encontraron elementos de FAQ');
            // Intentar de nuevo en 200ms
            setTimeout(setupFAQ, 200);
            return;
        }
        
        console.log('Configurando ' + faqItems.length + ' elementos de FAQ');
        
        // Para cada elemento de FAQ
        for (var i = 0; i < faqItems.length; i++) {
            var item = faqItems[i];
            var question = item.querySelector('.faq-question');
            
            if (!question) continue;
            
            // Usar función anónima para crear un ámbito cerrado
            (function(faqItem) {
                // Asignar evento onclick directamente
                question.onclick = function(e) {
                    // Detener propagación del evento
                    if (e && e.preventDefault) e.preventDefault();
                    if (e && e.stopPropagation) e.stopPropagation();
                    
                    // Verificar si este elemento está activo
                    var isActive = faqItem.classList.contains('active');
                    
                    // Cerrar todos los elementos abiertos
                    for (var j = 0; j < faqItems.length; j++) {
                        faqItems[j].classList.remove('active');
                    }
                    
                    // Si este elemento no estaba activo, abrirlo
                    if (!isActive) {
                        faqItem.classList.add('active');
                    }
                    
                    return false;
                };
            })(item);
        }
        
        // Abrir el primer elemento por defecto
        if (faqItems.length > 0) {
            faqItems[0].classList.add('active');
        }
    }
    
    // Ejecutar la función de configuración
    // Intentar varias veces para asegurar que se aplique
    setupFAQ();
    setTimeout(setupFAQ, 100);
    setTimeout(setupFAQ, 500);
    setTimeout(setupFAQ, 1000);
    
    // También ejecutar cuando el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', setupFAQ);
    
    // Y cuando la ventana se haya cargado completamente
    window.addEventListener('load', setupFAQ);
})(); 