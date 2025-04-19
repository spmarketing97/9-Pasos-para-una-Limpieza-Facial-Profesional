/**
 * Acordeón minimalista para módulos - Versión optimizada para móviles
 * - Maneja la apertura y cierre de módulos al hacer clic en los títulos
 * - Permite tener un solo módulo abierto a la vez
 * - Abre el primer módulo por defecto
 */

// Función autoejecutada para evitar conflictos
(function() {
    // Función principal para configurar el acordeón
    function setupAccordion() {
        console.log('Configurando acordeón para dispositivos móviles y desktop...');
        
        // Seleccionar todos los módulos y títulos
        var modulos = document.querySelectorAll('.modulo-minimalista');
        
        if (!modulos || modulos.length === 0) {
            console.log('No se encontraron módulos de acordeón');
            // Intentar de nuevo en 200ms
            setTimeout(setupAccordion, 200);
            return;
        }
        
        console.log('Encontrados ' + modulos.length + ' módulos de acordeón');
        
        // Limpiar eventos previos y cerrar todos los módulos
        for (var i = 0; i < modulos.length; i++) {
            var modulo = modulos[i];
            modulo.classList.remove('active');
            
            // Obtener el título del módulo
            var titulo = modulo.querySelector('h3');
            
            if (titulo) {
                // Clonar y reemplazar para eliminar eventos anteriores
                var nuevoTitulo = titulo.cloneNode(true);
                titulo.parentNode.replaceChild(nuevoTitulo, titulo);
                
                // Asignar evento onclick directamente usando IIFE para preservar referencia
                (function(currentModulo) {
                    nuevoTitulo.onclick = function(e) {
                        // Prevenir comportamiento por defecto
                        if (e && e.preventDefault) e.preventDefault();
                        if (e && e.stopPropagation) e.stopPropagation();
                        
                        // Comprobar si este módulo está activo
                        var isActive = currentModulo.classList.contains('active');
                        
                        // Cerrar todos los módulos primero
                        for (var j = 0; j < modulos.length; j++) {
                            modulos[j].classList.remove('active');
                        }
                        
                        // Si este módulo no estaba activo, abrirlo
                        if (!isActive) {
                            currentModulo.classList.add('active');
                        }
                        
                        return false;
                    };
                    
                    // Añadir soporte para teclado (accesibilidad)
                    nuevoTitulo.tabIndex = 0;
                    nuevoTitulo.setAttribute('role', 'button');
                    nuevoTitulo.addEventListener('keydown', function(e) {
                        // Si se presiona Enter o Space
                        if (e.keyCode === 13 || e.keyCode === 32) {
                            e.preventDefault();
                            // Simular clic
                            this.click();
                        }
                    });
                })(modulo);
            }
        }
        
        // Abrir el primer módulo por defecto
        if (modulos.length > 0) {
            modulos[0].classList.add('active');
        }
    }
    
    // Ejecutar función de inicialización en diferentes momentos para asegurar que se aplique
    
    // 1. Intentar inmediatamente si el DOM ya está listo
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setupAccordion();
    }
    
    // 2. Configurar cuando el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', setupAccordion);
    
    // 3. También cuando la ventana se cargue completamente
    window.addEventListener('load', setupAccordion);
    
    // 4. Y varios intentos después con diferentes tiempos
    setTimeout(setupAccordion, 500);
    setTimeout(setupAccordion, 1000);
    setTimeout(setupAccordion, 2000);
    
    // 5. Adicionalmente, reconfigurar en cambios de orientación del dispositivo
    window.addEventListener('orientationchange', function() {
        setTimeout(setupAccordion, 500);
    });
    
    // 6. Y en resize para cubrir cambios de tamaño de ventana
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setupAccordion, 500);
    });
})();

// Funcionalidad del acordeón y preguntas frecuentes
document.addEventListener('DOMContentLoaded', function() {
    // Manejo del acordeón de módulos
    const modulos = document.querySelectorAll('.modulo-minimalista');
    
    modulos.forEach(modulo => {
        const titulo = modulo.querySelector('h3');
        
        if (titulo) {
            titulo.addEventListener('click', () => {
                const isActive = modulo.classList.contains('active');
                
                // Cierra todos los módulos
                modulos.forEach(m => {
                    m.classList.remove('active');
                });
                
                // Si no estaba activo, lo activa
                if (!isActive) {
                    modulo.classList.add('active');
                }
            });
        }
    });
    
    // Manejo de las preguntas frecuentes
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', function() {
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
        
        // Abrir la primera pregunta por defecto
        setTimeout(() => {
            faqItems[0].classList.add('active');
        }, 1000);
    }
});