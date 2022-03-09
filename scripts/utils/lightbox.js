import clearHTMLNode from "./clearHTMLNode.js"

export function displayLightbox (mediaElement) {
    const lightbox = new LightboxFactory(mediaElement)
    lightbox.displayLightbox()
    lightbox.setLightboxMedia()
    //lightbox.getCardsDOM()
    const c = lightbox.getCurrentNodeIndex()
    const p = lightbox.getPreviousNodeIndex()
    const n = lightbox.getNextNodeIndex()
    const pm = lightbox.getPreviousMedia()
    console.log('#p', p, '#c', c, '#n', n)
    console.log('pm', pm)

    const lightboxPrevious = document.querySelector('.lightbox__previous')
    const lightboxNext = document.querySelector('.lightbox__next')
    lightboxPrevious.addEventListener('click', () => lightbox.setLightboxPreviousMedia())
    lightboxNext.addEventListener('click', () => lightbox.setLightboxNextMedia())
}

function closeLightbox () {
    
    const lightbox = document.querySelector('#lightbox')

    lightbox.style.display = 'none'
}

const closeLightBoxBtn = document.querySelector('#lightbox .close-btn')
closeLightBoxBtn.addEventListener('click', closeLightbox)


export class LightboxFactory {

    constructor(mediaElement) {
        this.mediaElement = mediaElement.srcElement
        this.lightbox = document.querySelector('#lightbox')
        this.lightboxMedia = this.lightbox.querySelector('.lightbox__media')
        this.currentNodeIndex = this.getCurrentNodeIndex()
    }

    displayLightbox () {    
        this.lightbox.style.display = 'block'
    }

    setLightboxMedia() {
        clearHTMLNode(this.lightboxMedia)
        const newMediaElement = this.mediaElement.cloneNode(true)
        this.lightboxMedia.appendChild(newMediaElement)
    }

    setLightboxNextMedia() {
        clearHTMLNode(this.lightboxMedia)
        const newMediaElement = this.getNextMedia().cloneNode(true)
        this.lightboxMedia.appendChild(newMediaElement)
        this.currentNodeIndex = this.getNextNodeIndex()
    }

    setLightboxPreviousMedia() {
        clearHTMLNode(this.lightboxMedia)
        const newMediaElement = this.getPreviousMedia().cloneNode(true)
        this.lightboxMedia.appendChild(newMediaElement)
        this.currentNodeIndex = this.getPreviousNodeIndex()
    }

    getCardParentNode () {
        const parentDOM = this.mediaElement.closest('.card')
        return parentDOM
    }

    getCardsNodes() {
        const nodes = this.getCardParentNode().closest('.cards').querySelectorAll('.card')
        return nodes
    }

    /***CURRENT */
    getCurrentNodeIndex() {
        const nodes = this.getCardsNodes()
        const currentNodeIndex = Array.from(nodes).findIndex(node => node === this.getCardParentNode())
        return currentNodeIndex
    }

    /***PREVIOUS */
    getPreviousNodeIndex () {
        const currentIndex = this.currentNodeIndex
        const previousNodeIndex = currentIndex > 0 ? currentIndex - 1 : this.getCardsNodes().length - 1
        return previousNodeIndex
    }
    
    getPreviousMedia(){
        const previousIndex = this.getPreviousNodeIndex()
        const previousNode = this.getCardsNodes().item(previousIndex)
        const previousMedia = previousNode.querySelector('img, video')
        return previousMedia
    }

    /*** NEXT */
    getNextNodeIndex () {
        const currentIndex = this.currentNodeIndex
        const nextNodeIndex = currentIndex < this.getCardsNodes().length - 1 ? currentIndex + 1 : 0
        return nextNodeIndex
    }

    getNextMedia(){
        const nextIndex = this.getNextNodeIndex()
        const nextNode = this.getCardsNodes().item(nextIndex)
        const nextMedia = nextNode.querySelector('img, video')
        return nextMedia
    }
    
}