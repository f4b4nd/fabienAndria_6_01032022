import AbstractFactory from "./abstract.js"
import { getLightbox } from "../utils/lightbox.js"

export default class MediasFactory extends AbstractFactory {

    constructor(data) {
        super()
        this.data = data
        this.likesCounter = data.likes
        this.mediaSource = `assets/media/${data.image ? data.image : data.video}`
    }

    getMediaCardComponent () {
        const mediaCardSchema = this.data.image ? this.getImageCardSchema() : this.getVideoCardSchema()
        return this.getHierarchizedComponent(mediaCardSchema)
    }

    getMediaCardSchema () {
        const mediaCardSchema = {
            article : {
                tagHTML: 'article',
                root: true,
                classnames: ['card'],
            },
            mediaContainer: {
                tagHTML: 'a',
                parent: '.card',
                classnames: ['card__media'],
                attributes : {
                    href: '#',
                    'aria-label': this.data.title
                }
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
                clickEventListener: (elementDOM) => getLightbox(elementDOM)
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
                tagHTML: 'p',
                parent: '.card__body__likes-wrapper',
                classnames: ['card__body__likes-counter'],
                text: this.likesCounter,
            },
            likesIcon: {
                tagHTML: 'i',
                parent: '.card__body__likes-wrapper',
                classnames: ['card__body__likes-icon', 'fa-regular', 'fa-heart'],
                clickEventListener: (elementDOM) => this.updateLikesDOM(elementDOM)
            }
        }

        return mediaCardSchema
    }

    getImageCardSchema () {
        const ImageCardSchema = this.getMediaCardSchema()
        ImageCardSchema.media.tagHTML = 'img'
        ImageCardSchema.media.classnames.push('card__media__image')
        ImageCardSchema.media.attributes['alt'] = this.data.title

        return ImageCardSchema
    }

    getVideoCardSchema () {
        const VideoCardSchema = this.getMediaCardSchema()
        VideoCardSchema.media.tagHTML = 'video'
        VideoCardSchema.media.classnames.push('card__media__video')
        VideoCardSchema.media.attributes['controls'] = 'controls'
        VideoCardSchema.media.attributes['type'] = 'video/mp4'
        VideoCardSchema.media.attributes['title'] = this.data.title

        return VideoCardSchema
    }

    updateLikesDOM (elementDOM) {
        const likesIconDOM = elementDOM.srcElement
        const likesWrapperDOM = likesIconDOM.closest('.card__body__likes-wrapper')
        const likesCounterDOM = likesWrapperDOM.querySelector('.card__body__likes-counter')

        this.updateLikesCounterDOM(likesCounterDOM)
        this.updateLikesIconDOM(likesIconDOM)
        this.updateTotalLikesCounterDOM()
    }

    updateLikesCounterDOM (likesCounterDOM) {        
        const increment = (this.likesCounter === this.data.likes) ? 1 : 0
        this.likesCounter = this.data.likes + increment
        likesCounterDOM.textContent = this.likesCounter
    }

    updateLikesIconDOM (likesIconDOM) {

        if (likesIconDOM.classList.contains('fa-solid')) {
            likesIconDOM.classList.remove('fa-solid')
            likesIconDOM.classList.add('fa-regular')
        }
        else {
            likesIconDOM.classList.remove('fa-regular')
            likesIconDOM.classList.add('fa-solid')        
        }
    }

    updateTotalLikesCounterDOM () {

        const totalLikes = document.querySelectorAll('.card__body__likes-counter')
        const totalLikesCounter = [...totalLikes].reduce((acc, current) => {
            return acc + parseInt(current.textContent)
        }, 0)

        const sectionDOM = document.querySelector('.popup__total-likes-counter')
        sectionDOM.textContent = totalLikesCounter
    }
}

