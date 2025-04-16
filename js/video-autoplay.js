// Script para asegurar que el video se reproduzca automáticamente una sola vez
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('banner-video');
    if (video) {
        // Asegurarse de que el video esté silenciado inicialmente para permitir autoplay
        video.muted = true;
        
        // Asegurarse de que el video no se reproduzca en bucle
        video.loop = false;
        
        // Intentar reproducir el video automáticamente
        video.play().catch(function(error) {
            console.log('Error al reproducir el video automáticamente:', error);
            // Intentar reproducir al hacer clic en la página
            document.body.addEventListener('click', function() {
                video.play();
            }, { once: true });
        });
        
        // Agregar botón para activar/desactivar sonido si es necesario
        const videoContainer = video.parentElement;
        if (videoContainer) {
            const muteButton = document.createElement('button');
            muteButton.className = 'mute-toggle';
            muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
            muteButton.style.position = 'absolute';
            muteButton.style.bottom = '70px';
            muteButton.style.right = '10px';
            muteButton.style.zIndex = '10';
            muteButton.style.background = 'rgba(0,0,0,0.5)';
            muteButton.style.color = 'white';
            muteButton.style.border = 'none';
            muteButton.style.borderRadius = '50%';
            muteButton.style.width = '40px';
            muteButton.style.height = '40px';
            muteButton.style.cursor = 'pointer';
            
            muteButton.addEventListener('click', function() {
                video.muted = !video.muted;
                muteButton.innerHTML = video.muted ? 
                    '<i class="fas fa-volume-mute"></i>' : 
                    '<i class="fas fa-volume-up"></i>';
            });
            
            videoContainer.style.position = 'relative';
            videoContainer.appendChild(muteButton);
        }
    }
});