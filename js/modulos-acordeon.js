/**
 * Script exclusivo para el acordeón de módulos
 * Optimizado para dispositivos móviles y táctiles
 */

// Función autoejecutada para evitar conflictos
(function() {
    // ID para depuración
    var scriptID = 'modulos-acordeon-' + Math.floor(Math.random() * 1000);
    
    // Función principal para activar el acordeón de módulos
    function activarAcordeonModulos() {
        console.log('[' + scriptID + '] Iniciando activación de acordeón de módulos');
        
        // Seleccionar todos los módulos
        var modulos = document.querySelectorAll('.modulo-minimalista');
        
        if (!modulos || modulos.length === 0) {
            console.log('[' + scriptID + '] No se encontraron módulos para el acordeón');
            return;
        }
        
        console.log('[' + scriptID + '] Encontrados ' + modulos.length + ' módulos');
        
        // Para cada módulo, configurar el comportamiento
        for (var i = 0; i < modulos.length; i++) {
            var modulo = modulos[i];
            var titulo = modulo.querySelector('h3');
            
            if (!titulo) continue;
            
            // Configurar evento de clic de manera robusta
            configurarEventos(titulo, modulo, modulos);
        }
        
        // Abrir el primer módulo por defecto (solo si ninguno está abierto)
        var algunoActivo = false;
        for (var j = 0; j < modulos.length; j++) {
            if (modulos[j].classList.contains('active')) {
                algunoActivo = true;
                break;
            }
        }
        
        if (!algunoActivo && modulos.length > 0) {
            modulos[0].classList.add('active');
            
            // También actualizar el atributo ARIA
            var primerTitulo = modulos[0].querySelector('h3');
            if (primerTitulo) {
                primerTitulo.setAttribute('aria-expanded', 'true');
            }
        }
        
        console.log('[' + scriptID + '] Acordeón de módulos configurado correctamente');
    }
    
    // Función para configurar eventos en un título
    function configurarEventos(titulo, modulo, todosModulos) {
        // 1. Configurar atributos de accesibilidad
        titulo.setAttribute('role', 'button');
        titulo.setAttribute('aria-expanded', modulo.classList.contains('active') ? 'true' : 'false');
        titulo.setAttribute('tabindex', '0');
        
        // ID único para el contenido
        var contenidoId = 'modulo-contenido-' + Math.floor(Math.random() * 10000);
        var contenido = modulo.querySelector('.modulo-contenido');
        if (contenido) {
            contenido.id = contenidoId;
            titulo.setAttribute('aria-controls', contenidoId);
        }
        
        // 2. Evento de clic
        titulo.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            manejarActivacion(modulo, todosModulos, titulo);
            return false;
        });
        
        // 3. Evento táctil para móviles
        titulo.addEventListener('touchend', function(e) {
            e.preventDefault();
            manejarActivacion(modulo, todosModulos, titulo);
        });
        
        // 4. Soporte para teclado (accesibilidad)
        titulo.addEventListener('keydown', function(e) {
            // Si es Enter o Space
            if (e.keyCode === 13 || e.keyCode === 32) {
                e.preventDefault();
                manejarActivacion(modulo, todosModulos, titulo);
            }
        });
    }
    
    // Función para manejar la activación/desactivación
    function manejarActivacion(modulo, todosModulos, titulo) {
        // Verificar estado actual
        var estaActivo = modulo.classList.contains('active');
        
        // Desactivar todos los módulos
        for (var i = 0; i < todosModulos.length; i++) {
            var otroModulo = todosModulos[i];
            otroModulo.classList.remove('active');
            
            var otroTitulo = otroModulo.querySelector('h3');
            if (otroTitulo) {
                otroTitulo.setAttribute('aria-expanded', 'false');
            }
        }
        
        // Si este no estaba activo, activarlo
        if (!estaActivo) {
            modulo.classList.add('active');
            titulo.setAttribute('aria-expanded', 'true');
            
            // Hacer scroll suave hasta el módulo si está fuera de la vista
            if (estaFueraDeVista(modulo)) {
                setTimeout(function() {
                    modulo.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        }
    }
    
    // Comprueba si un elemento está fuera de la vista
    function estaFueraDeVista(elemento) {
        var rect = elemento.getBoundingClientRect();
        return (
            rect.top < 0 ||
            rect.left < 0 ||
            rect.bottom > window.innerHeight ||
            rect.right > window.innerWidth
        );
    }
    
    // Iniciar el acordeón en diferentes momentos para asegurar la inicialización
    
    // Si el DOM ya está cargado, ejecutar inmediatamente
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        activarAcordeonModulos();
    }
    
    // Al cargar el DOM
    document.addEventListener('DOMContentLoaded', activarAcordeonModulos);
    
    // Al cargar completamente la página
    window.addEventListener('load', activarAcordeonModulos);
    
    // Intentar otra vez después de un momento
    setTimeout(activarAcordeonModulos, 500);
    setTimeout(activarAcordeonModulos, 1000);
    
    // En cambios de orientación (móviles)
    window.addEventListener('orientationchange', function() {
        setTimeout(activarAcordeonModulos, 500);
    });
    
    // En resize (cambios de tamaño de ventana)
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(activarAcordeonModulos, 300);
    });
})(); 