export function closeLightbox () {
    
    const lightbox = document.querySelector('#lightbox')

    lightbox.style.display = 'none'
}

export function displayLightbox () {
    const lightbox = document.querySelector('#lightbox')

    lightbox.style.display = 'block'
}