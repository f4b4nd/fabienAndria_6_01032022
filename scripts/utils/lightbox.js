import clearHTMLNode from "./clearHTMLNode.js"

function closeLightbox () {
    const lightbox = document.querySelector('#lightbox')
    lightbox.style.display = 'none'
}

const closeLightBoxBtn = document.querySelector('#lightbox .close-btn')
closeLightBoxBtn.addEventListener('click', closeLightbox)


export function displayLightbox (mediaElement) {
    const lightbox = new LightboxFactory(mediaElement.srcElement)
    lightbox.displayLightbox()
    lightbox.setLightbox()

    /**PREVIOUS */
    const lightboxPrevious = document.querySelector('.lightbox__previous')
    lightboxPrevious.addEventListener('click', () => lightbox.setPreviousLightbox())

    /**NEXT */
    const lightboxNext = document.querySelector('.lightbox__next')
    lightboxNext.addEventListener('click', () => lightbox.setNextLightbox())
}

export class LightboxFactory {

    constructor(media) {
        this.media = media
        this.title = this.getTitle()
        this.lightbox = document.querySelector('#lightbox')
        this.lightboxMedia = this.lightbox.querySelector('.lightbox__media')
        this.currentNodeIndex = this.getInitialNodeIndex()
    }

    displayLightbox () {    
        this.lightbox.style.display = 'block'
    }

    /**SETTERS */
    setMedia () {
        this.media = this.getMedia()
    }

    setTitle () {
        this.title = this.getTitle()
    }

    setLightbox () {
        this.setLightboxMedia()
        this.setLightboxTitle()
    }

    setLightboxMedia () {
        clearHTMLNode(this.lightboxMedia)
        const newMedia = this.media.cloneNode(true)
        this.lightboxMedia.appendChild(newMedia)
    }

    setLightboxTitle () {
        const lightboxTitle = this.lightbox.querySelector('.lightbox__title')
        lightboxTitle.textContent = this.title
    }

    setPreviousLightbox () {
        this.currentNodeIndex = this.getPreviousNodeIndex()
        this.setMedia()
        this.setLightbox()
    }

    setNextLightbox () {
        this.currentNodeIndex = this.getNextNodeIndex()
        this.setMedia()
        this.setLightbox()
    }

    /***GETTERS*/
    getCurrentNode () {
        const parentDOM = this.media.closest('.card')
        return parentDOM
    }

    getAllNodes () {
        const nodes = this.getCurrentNode().closest('.cards').querySelectorAll('.card')
        return nodes
    }

    getMedia () {
        const currentNode = this.getAllNodes().item(this.currentNodeIndex)
        const media = currentNode.querySelector('img, video')
        return media
    }

    getTitle () {
        const currentNode = this.getAllNodes().item(this.currentNodeIndex)
        const title = currentNode.querySelector('.card__body__title').textContent
        return title
    }

    /***INDEXES */
    getInitialNodeIndex () {
        const nodes = this.getAllNodes()
        const currentIndex = Array.from(nodes).findIndex(node => node === this.getCurrentNode())
        return currentIndex
    }

    getPreviousNodeIndex () {
        const previousIndex = this.currentNodeIndex > 0 ? this.currentNodeIndex - 1 : this.getAllNodes().length - 1
        return previousIndex
    }

    getNextNodeIndex () {
        const nextIndex = this.currentNodeIndex < this.getAllNodes().length - 1 ? this.currentNodeIndex + 1 : 0
        return nextIndex
    }
    
}