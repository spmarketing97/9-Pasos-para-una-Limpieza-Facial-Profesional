/**
 * Acordeón minimalista para módulos
 * - Maneja la apertura y cierre de módulos al hacer clic en los títulos
 * - Permite tener un solo módulo abierto a la vez
 * - Abre el primer módulo por defecto
 */
document.addEventListener('DOMContentLoaded', function() {
    // Función para inicializar el acordeón
    function initAccordion() {
        const moduloTitulos = document.querySelectorAll('.modulo-minimalista h3');
        
        if (moduloTitulos.length === 0) {
            console.log('No se encontraron elementos de acordeón');
            return;
        }
        
        console.log('Inicializando acordeón con ' + moduloTitulos.length + ' módulos');
        
        // Eliminar eventos previos para evitar duplicados
        moduloTitulos.forEach((titulo, index) => {
            // Clonar y reemplazar para eliminar eventos previos
            const clonedTitulo = titulo.cloneNode(true);
            titulo.parentNode.replaceChild(clonedTitulo, titulo);
            
            // Agregar nuevo evento de clic
            clonedTitulo.addEventListener('click', function(e) {
                e.preventDefault();
                const modulo = this.parentElement;
                
                // Toggle la clase active en el módulo actual
                modulo.classList.toggle('active');
                
                // Opcional: cerrar otros módulos cuando se abre uno nuevo
                document.querySelectorAll('.modulo-minimalista h3').forEach(otroTitulo => {
                    if (otroTitulo !== this) {
                        otroTitulo.parentElement.classList.remove('active');
                    }
                });
                
                console.log('Clic en módulo: ' + index);
            });
        });
        
        // Abrir el primer módulo por defecto
        if (moduloTitulos.length > 0) {
            moduloTitulos[0].parentElement.classList.add('active');
        }
    }
    
    // Inicializar el acordeón
    initAccordion();
    
    // También inicializar cuando la ventana se carga completamente
    window.addEventListener('load', initAccordion);
});