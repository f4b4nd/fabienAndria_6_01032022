import clearHTMLNode from "../utils/clearHTMLNode.js"

export default class LightboxFactory {

    /**
     * Returns x raised to the n-th power.
     *
     * @param {htmlElement} media img or video HTMLelement
     * @param {int} currentNodeIndex the current index of the html .card node
     * @return {NodeList} HTMLNode list of all parents of class ".card"
    */

    constructor(media, currentNodeIndex, nodes) {
        this.media = media
        this.currentNodeIndex = currentNodeIndex
        this.nodes = nodes
        this.title = this.getTitle()
        this.lightbox = document.querySelector('#lightbox')
        this.lightboxMedia = this.lightbox.querySelector('.lightbox__media')
        this.lightboxTitle = this.lightbox.querySelector('.lightbox__title')
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
        this.lightboxTitle.textContent = this.title
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

    setVideoOnPause () {
        const video = this.lightboxMedia.querySelector('video')
        if (!video) return
        video.paused ? video.play() : video.pause()
    }

    /***GETTERS*/
    getMedia () {
        const currentNode = this.nodes.item(this.currentNodeIndex)
        const media = currentNode.querySelector('img, video')
        return media
    }

    getTitle () {
        const currentNode = this.nodes.item(this.currentNodeIndex)
        const title = currentNode.querySelector('.card__body__title').textContent
        return title
    }

    /***INDEXES */
    getPreviousNodeIndex () {
        const previousIndex = this.currentNodeIndex > 0 ? this.currentNodeIndex - 1 : this.nodes.length - 1
        return previousIndex
    }

    getNextNodeIndex () {
        const nextIndex = this.currentNodeIndex < this.nodes.length - 1 ? this.currentNodeIndex + 1 : 0
        return nextIndex
    }

}
