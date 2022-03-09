export function displayLightbox () {
    const lightbox = document.querySelector('#lightbox')

    lightbox.style.display = 'block'
}

function closeLightbox () {
    
    const lightbox = document.querySelector('#lightbox')

    lightbox.style.display = 'none'
}

const closeLightBoxBtn = document.querySelector('#lightbox .close-btn')
closeLightBoxBtn.addEventListener('click', closeLightbox)