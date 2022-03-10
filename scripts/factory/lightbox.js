import clearHTMLNode from "../utils/clearHTMLNode.js"

export default class LightboxFactory {

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

    closeLightbox () {
        this.lightbox.style.display = 'none'
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
        this.setTitle()
        this.setLightbox()
    }

    setNextLightbox () {
        this.currentNodeIndex = this.getNextNodeIndex()
        this.setMedia()
        this.setTitle()
        this.setLightbox()
    }

    /***GETTERS*/
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
        const initialNodeIndex = Array.from(nodes).findIndex(node => node === this.getInitialNode())
        return initialNodeIndex
    }

    getPreviousNodeIndex () {
        const previousIndex = this.currentNodeIndex > 0 ? this.currentNodeIndex - 1 : this.getAllNodes().length - 1
        return previousIndex
    }

    getNextNodeIndex () {
        const nextIndex = this.currentNodeIndex < this.getAllNodes().length - 1 ? this.currentNodeIndex + 1 : 0
        return nextIndex
    }
    
    /**NODE GETTER **/
    getInitialNode () {
        const initialNode = this.media.closest('.card')
        return initialNode
    }

    getAllNodes () {
        const nodes = this.getInitialNode().closest('.cards').querySelectorAll('.card')
        return nodes
    }

}