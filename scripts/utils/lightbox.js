import clearHTMLNode from "./clearHTMLNode.js"

export function displayLightbox (mediaElement) {
    const lightbox = new LightboxFactory(mediaElement)
    lightbox.displayLightbox()
    lightbox.setLightboxMedia()
}

function closeLightbox () {
    
    const lightbox = document.querySelector('#lightbox')

    lightbox.style.display = 'none'
}

const closeLightBoxBtn = document.querySelector('#lightbox .close-btn')
closeLightBoxBtn.addEventListener('click', closeLightbox)


export class LightboxFactory {

    constructor(mediaElement) {
        this.mediaElement = mediaElement.srcElement.cloneNode(true)
        this.lightbox = document.querySelector('#lightbox')
    }

    displayLightbox () {    
        this.lightbox.style.display = 'block'
    }

    setLightboxMedia() {
    
        const lightboxMediaDOM = this.lightbox.querySelector('.lightbox__media')
        clearHTMLNode(lightboxMediaDOM)
    
        lightboxMediaDOM.appendChild(this.mediaElement)

    }
}