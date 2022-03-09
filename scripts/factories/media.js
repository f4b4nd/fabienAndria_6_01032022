import AbstractFactory from "./abstract.js"
import { displayLightbox } from "../utils/lightbox.js"

export default class PhotographerMediasFactory extends AbstractFactory {

    constructor(data) {
        super()
        this.data = data
        this.likesCounter = data.likes
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
                },
                onclick: () => displayLightbox()
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
                classnames: ['card__body__likes-counter'],
                text: this.likesCounter,
            },
            likesIcon: {
                tagHTML: 'span',
                parent: '.card__body__likes-wrapper',
                classnames: ['card__body__likes-icon', 'fa-regular', 'fa-heart'],
                clickEventListener: (elementDOM) => this.updateLikesCounter(elementDOM)
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

    updateLikesCounter (elementDOM) {

        const iconDOM = elementDOM.srcElement
        const parentDOM = iconDOM.closest('.card__body__likes-wrapper')
        const counterDOM = parentDOM.querySelector('.card__body__likes-counter')
        
        const increment = (this.likesCounter === this.data.likes) ? 1 : 0
        this.likesCounter = this.data.likes + increment
        counterDOM.textContent = this.likesCounter


        this.updateLikesIconClass(iconDOM)
        this.updateTotalLikesCounter()
    }

    updateLikesIconClass (iconDOM) {

        if (iconDOM.classList.contains('fa-solid')) {
            iconDOM.classList.remove('fa-solid')
            iconDOM.classList.add('fa-regular')
        }
        else {
            iconDOM.classList.remove('fa-regular')
            iconDOM.classList.add('fa-solid')        
        }
    }

    updateTotalLikesCounter () {

        const totalLikes = document.querySelectorAll('.card__body__likes-counter')
        const totalLikesCounter = [...totalLikes].reduce((acc, current) => {
            return acc + parseInt(current.textContent)
        }, 0)

        const sectionDOM = document.querySelector('.popup__total-likes-counter')
        sectionDOM.textContent = totalLikesCounter
    }
}

