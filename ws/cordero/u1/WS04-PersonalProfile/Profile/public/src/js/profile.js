document.addEventListener('DOMContentLoaded', () => {
    console.log('Perfil cargado correctamente');
    
    // Actualizar la fecha de última modificación
    const dateElement = document.getElementById('lastUpdated');
    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString();
    }
    
    // Añadir efectos interactivos a los detalles
    const details = document.querySelectorAll('.detail');
    details.forEach(detail => {
        detail.addEventListener('mouseenter', () => {
            detail.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--accent');
        });
        
        detail.addEventListener('mouseleave', () => {
            detail.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
        });
    });
    
    // Efecto suave de aparición para elementos del perfil
    const allElements = document.querySelectorAll('.profile > *, .info > *');
    
    allElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

