/**
 * Acordeón minimalista para módulos - Versión compatible con GitHub Pages
 * - Maneja la apertura y cierre de módulos al hacer clic en los títulos
 * - Permite tener un solo módulo abierto a la vez
 * - Abre el primer módulo por defecto
 */

// Enfoque directo para GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    setupAccordion();
});

// También inicializar cuando la ventana se carga completamente
window.addEventListener('load', function() {
    setupAccordion();
});

// Inicializar también si el DOM ya está cargado
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(function() {
        setupAccordion();
    }, 100);
}

// Función principal para configurar el acordeón
function setupAccordion() {
    console.log('Configurando acordeón para GitHub Pages...');
    
    // Seleccionar todos los módulos y títulos
    const modulos = document.querySelectorAll('.modulo-minimalista');
    
    if (modulos.length === 0) {
        console.log('No se encontraron módulos de acordeón');
        return;
    }
    
    console.log('Encontrados ' + modulos.length + ' módulos de acordeón');
    
    // Cerrar todos los módulos primero
    modulos.forEach(function(modulo) {
        modulo.classList.remove('active');
        
        // Obtener el título del módulo
        const titulo = modulo.querySelector('h3');
        
        if (titulo) {
            // Asignar evento de clic directamente
            titulo.onclick = function(e) {
                e.preventDefault();
                
                // Cerrar todos los módulos primero
                modulos.forEach(function(m) {
                    m.classList.remove('active');
                });
                
                // Abrir el módulo actual
                modulo.classList.add('active');
                
                return false; // Prevenir comportamiento por defecto
            };
        }
    });
    
    // Abrir el primer módulo por defecto
    if (modulos.length > 0) {
        modulos[0].classList.add('active');
    }
}

// Asegurar que el acordeón se inicialice después de un tiempo
setTimeout(function() {
    setupAccordion();
}, 500);

// Intentar una última vez después de 2 segundos
setTimeout(function() {
    setupAccordion();
}, 2000);