import AbstractFactory from "./abstract.js"

export class PhotographerMediasFactory extends AbstractFactory {

    constructor(data) {
        super()
        this.data = data
        this.mediaSource = `assets/media/${data.image ? data.image : data.video}`
    }

    getMediaCardDOM () {
        const mediaCardSchema = this.data.image ? this.getImageMediaCardSchema() : this.getVideoMediaCardSchema()
        return this.getHierarchizedElementDOM(mediaCardSchema)
    }

    getMediaCardSchema () {
        const mediaCardSchema = {
            article : {
                tagHTML: 'article',
                root: true,
                classnames: ['card'],
            },
            mediaContainer: {
                tagHTML: 'div',
                parent: '.card',
                classnames: ['card__media']
            },
            bodyContainer: {
                tagHTML: 'div',
                parent: '.card',
                classnames: ['card__body']
            },
            media: {
                tagHTML: null,
                parent: '.card__media',
                classnames: ['card__media__content'],
                attributes: {
                    src: this.mediaSource
                }
            },
            title: {
                tagHTML: 'p',
                parent: '.card__body',
                text: this.data.title,
                classnames: ['card__body__title']
            },
            likesWrapper : {
                tagHTML: 'span',
                parent: '.card__body',
                classnames: ['card__body__likes-wrapper']
            },
            likesCounter: {
                tagHTML: 'span',
                parent: '.card__body__likes-wrapper',
                classnames: ['card__body__likes-counter']
            },
            likesIcon: {
                tagHTML: 'span',
                parent: '.card__body__likes-wrapper',
                classnames: ['card__body__likes-icon', 'fa-solid', 'fa-heart']
            }
        }

        return mediaCardSchema
    }

    getImageMediaCardSchema () {
        const ImageMediaCardSchema = this.getMediaCardSchema()
        ImageMediaCardSchema.media.tagHTML = 'img'
        ImageMediaCardSchema.media.classnames.push('card__media__image')
        ImageMediaCardSchema.media.attributes['alt'] = this.data.title

        return ImageMediaCardSchema
    }

    getVideoMediaCardSchema () {
        const VideoMediaCardSchema = this.getMediaCardSchema()
        VideoMediaCardSchema.media.tagHTML = 'video'
        VideoMediaCardSchema.media.classnames.push('card__media__video')
        VideoMediaCardSchema.media.attributes['controls'] = 'controls'

        return VideoMediaCardSchema
    }
}

export function photographerMediasFactory () {

    function incrementLikesCounter (likes, likesCounterElement) {
        likesDOM = parseInt(likesCounterElement.textContent)
        if (likes === likesDOM) {
            likesCounterElement.textContent = likesDOM + 1
        }
        else {
            likesCounterElement.textContent = likes
        }
    }

    function getImageMediaCardDOM (mediaData) {

        const { id, title, image, likes } = mediaData

        const picture = `assets/media/${image}`

        const articleElement = document.createElement('article')
        const titleElement = document.createElement('p')
        const imageContainerElement = document.createElement('div')
        const bodyContainerElement = document.createElement('div')
        const imgElement = document.createElement('img')
        const likesElement = document.createElement('span')
        const likesCounterElement = document.createElement('span')
        const likesIconElement = document.createElement('span')

        titleElement.textContent = title
        imgElement.setAttribute('src', picture)
        imgElement.setAttribute('alt', title)
        likesCounterElement.textContent = likes

        bodyContainerElement.classList.add('article__body')
        imageContainerElement.classList.add('article__image')
        likesElement.classList.add('likes-wrapper')
        likesCounterElement.classList.add('likes-counter')
        likesIconElement.classList.add('fa-solid', 'fa-heart')

        imageContainerElement.onclick = function () { displayLightbox() }

        likesIconElement.onclick = () => incrementLikesCounter (likes, likesCounterElement)

        articleElement.appendChild(imageContainerElement)
        articleElement.appendChild(bodyContainerElement)

        bodyContainerElement.appendChild(titleElement)
        bodyContainerElement.appendChild(likesElement)
        imageContainerElement.appendChild(imgElement)

        likesElement.appendChild(likesCounterElement)
        likesElement.appendChild(likesIconElement)

        return articleElement
    }

    function getVideoMediaCardDOM (mediaData) {

        const { id, title, video, likes } = mediaData

        const media = `assets/media/${video}`

        const articleElement = document.createElement('article')
        const titleElement = document.createElement('p')
        const mediaContainerElement = document.createElement('div')
        const bodyContainerElement = document.createElement('div')
        const mediaElement = document.createElement('video')
        const likesElement = document.createElement('span')
        const likesCounterElement = document.createElement('span')
        const likesIconElement = document.createElement('span')

        titleElement.textContent = title
        mediaElement.setAttribute('src', media)
        mediaElement.setAttribute('controls', 'controls')
        likesCounterElement.textContent = likes

        bodyContainerElement.classList.add('article__body')
        mediaContainerElement.classList.add('article__video')
        likesElement.classList.add('likes-wrapper')
        likesCounterElement.classList.add('likes-counter')
        likesIconElement.classList.add('fa-solid', 'fa-heart')

        mediaContainerElement.onclick = function () { displayLightbox() }

        
        likesIconElement.onclick = () => incrementLikesCounter (likes, likesCounterElement)

        articleElement.appendChild(mediaContainerElement)
        articleElement.appendChild(bodyContainerElement)

        bodyContainerElement.appendChild(titleElement)
        bodyContainerElement.appendChild(likesElement)
        mediaContainerElement.appendChild(mediaElement)

        likesElement.appendChild(likesCounterElement)
        likesElement.appendChild(likesIconElement)

        return articleElement
    }


    return { getImageMediaCardDOM, getVideoMediaCardDOM }

}