import clearHTMLNode from "./clearHTMLNode.js"

function closeLightbox () {
    const lightbox = document.querySelector('#lightbox')
    lightbox.style.display = 'none'
}

const closeLightBoxBtn = document.querySelector('#lightbox .close-btn')
closeLightBoxBtn.addEventListener('click', closeLightbox)


export function displayLightbox (mediaElement) {
    const lightbox = new LightboxFactory(mediaElement)
    lightbox.displayLightbox()
    lightbox.setMedia(mediaElement.srcElement)
    lightbox.setTitle()

    /**PREVIOUS */
    const lightboxPrevious = document.querySelector('.lightbox__previous')
    lightboxPrevious.addEventListener('click', () => lightbox.setPreviousLightbox())

    /**NEXT */
    const lightboxNext = document.querySelector('.lightbox__next')
    lightboxNext.addEventListener('click', () => lightbox.setNextLightbox())
}

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

    /**SETTERS */
    setMedia(mediaElement) {
        clearHTMLNode(this.lightboxMedia)
        const newMediaElement = mediaElement.cloneNode(true)
        this.lightboxMedia.appendChild(newMediaElement)
    }

    setTitle () {
        const lightboxTitle = this.lightbox.querySelector('.lightbox__title')
        lightboxTitle.textContent = this.getTitle()
    }

    setPreviousLightbox() {
        this.currentNodeIndex = this.getPreviousNodeIndex()
        const media = this.getMedia()
        this.setMedia(media)
        this.setTitle()
    }

    setNextLightbox() {
        this.currentNodeIndex = this.getNextNodeIndex()
        const media = this.getMedia()
        this.setMedia(media)
        this.setTitle()
    }

    /***GETTERS*/
    getCardParentNode () {
        const parentDOM = this.mediaElement.closest('.card')
        return parentDOM
    }

    getCardsNodes() {
        const nodes = this.getCardParentNode().closest('.cards').querySelectorAll('.card')
        return nodes
    }

    getTitle() {
        const currentNode = this.getCardsNodes().item(this.currentNodeIndex)
        const title = currentNode.querySelector('.card__body__title').textContent
        return title
    }

    getMedia () {
        const currentNode = this.getCardsNodes().item(this.currentNodeIndex)
        const media = currentNode.querySelector('img, video')
        return media
    }

    /***INDEXES */
    getCurrentNodeIndex() {
        const nodes = this.getCardsNodes()
        const currentNodeIndex = Array.from(nodes).findIndex(node => node === this.getCardParentNode())
        return currentNodeIndex
    }

    getPreviousNodeIndex () {
        const currentIndex = this.currentNodeIndex
        const previousNodeIndex = currentIndex > 0 ? currentIndex - 1 : this.getCardsNodes().length - 1
        return previousNodeIndex
    }

    getNextNodeIndex () {
        const currentIndex = this.currentNodeIndex
        const nextNodeIndex = currentIndex < this.getCardsNodes().length - 1 ? currentIndex + 1 : 0
        return nextNodeIndex
    }
    
}