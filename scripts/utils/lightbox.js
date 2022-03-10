import LightboxFactory from "../factory/lightbox.js"


export function getLightbox (mediaElement) {

    const lightbox = new LightboxFactory(mediaElement.srcElement)
    lightbox.displayLightbox()
    lightbox.setLightbox()

    /**PREVIOUS */
    const previousLightboxBtn = document.querySelector('.lightbox__previous')
    previousLightboxBtn.addEventListener('click', () => lightbox.setPreviousLightbox())

    /**NEXT */
    const nextLightboxBtn = document.querySelector('.lightbox__next')
    nextLightboxBtn.addEventListener('click', () => lightbox.setNextLightbox())

    /** CLOSE */
    const closeLightBoxBtn = document.querySelector('#lightbox .close-btn')
    closeLightBoxBtn.addEventListener('click', () => lightbox.closeLightbox())

}
