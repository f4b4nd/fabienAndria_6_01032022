import clearHTMLNode from "./clearHTMLNode.js"

export function displayLightbox (mediaElement, data) {
    const lightbox = new LightboxFactory(mediaElement, data)
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


const lightboxNext = document.querySelector('.lightbox__next')

export class LightboxFactory {

    constructor(mediaElement, data) {
        this.mediaElement = mediaElement.srcElement
        this.lightbox = document.querySelector('#lightbox')
        this.data = data
    }

    displayLightbox () {    
        this.lightbox.style.display = 'block'
    }

    setLightboxMedia() {
        const lightboxMediaDOM = this.lightbox.querySelector('.lightbox__media')
        clearHTMLNode(lightboxMediaDOM)
        const newMediaElement = this.mediaElement.cloneNode(true)
        lightboxMediaDOM.appendChild(newMediaElement)
    }

    setLightboxNextMedia() {
        const lightboxMediaDOM = this.lightbox.querySelector('.lightbox__media')
        clearHTMLNode(lightboxMediaDOM)
        const newMediaElement = this.getNextMedia().cloneNode(true)
        lightboxMediaDOM.appendChild(newMediaElement)    
    }

    setLightboxPreviousMedia() {
        const lightboxMediaDOM = this.lightbox.querySelector('.lightbox__media')
        clearHTMLNode(lightboxMediaDOM)
        const newMediaElement = this.getPreviousMedia().cloneNode(true)
        lightboxMediaDOM.appendChild(newMediaElement)    
    }

    getCardParentNode () {
        const parentDOM = this.mediaElement.closest('.card')
        return parentDOM
    }

    getCardsNodes() {
        const nodes = this.getCardParentNode().closest('.cards').querySelectorAll('.card')
        return nodes
    }

    getCurrentNodeIndex() {
        const nodes = this.getCardsNodes()
        const currentNodeIndex = Array.from(nodes).findIndex(node => node === this.getCardParentNode())
        return currentNodeIndex
    }

    getPreviousNodeIndex () {
        const currentIndex = this.getCurrentNodeIndex()
        const previousNodeIndex = currentIndex > 0 ? currentIndex - 1 : this.getCardsNodes().length - 1
        return previousNodeIndex
    }

    getNextNodeIndex () {
        const currentIndex = this.getCurrentNodeIndex()
        const nextNodeIndex = currentIndex < this.getCardsNodes().length - 1 ? currentIndex + 1 : 0
        return nextNodeIndex
    }

    getPreviousMedia(){
        const previousIndex = this.getPreviousNodeIndex()
        const previousNode = this.getCardsNodes().item(previousIndex)
        const previousMedia = previousNode.querySelector('img, video')
        return previousMedia
    }

    getNextMedia(){
        const nextIndex = this.getNextNodeIndex()
        const nextNode = this.getCardsNodes().item(nextIndex)
        const nextMedia = nextNode.querySelector('img, video')
        return nextMedia
    }
    
}