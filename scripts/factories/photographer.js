import AbstractFactory from "./abstract.js"

export class PhotographerFactory extends AbstractFactory {

    constructor (data) {
        super()
        this.data = data
        this.urlPhotographer = `photographer.html?id=${data.id}`
        this.imageSource = `assets/photographers/${data.portrait}`
        this.location = `${data.city}, ${data.country}`
        this.price = `${data.price}€/jour`
    }

    getUserCardDOM () {

        const userCardSchema = {
            article : {
                tagHTML: 'article',
                classnames: ['card'],
                root: true,
            },
            a : {
                tagHTML: 'a',
                parent : '.card',   
                classnames: ['card__header'],
                attributes: {
                    href: this.urlPhotographer
                },
            },
            imageContainer : {
                tagHTML: 'div',
                parent: '.card__header',
                classnames: ['card__header__image'],
            },
            img: {
                tagHTML: 'img',
                parent: '.card__header__image',
                attributes : {
                    alt: this.data.name,
                    src: this.imageSource
                },
            },
            h2 : {
                tagHTML: 'h2',
                parent: '.card__header',
                classnames: ['card__header__title'],
                text: this.data.name,
            },
            bodyContainer : {
                tagHTML: 'div',
                parent: '.card',
                classnames: ['card__body'],
            },
            location : {
                tagHTML: 'div',
                parent: '.card__body',
                classnames: ['card__body__location'],
                text: this.location,
            },
            tagline : {
                tagHTML: 'div',
                parent: '.card__body',
                classnames: ['card__body__tagline'],
                text: this.data.tagline, 
            },
            price : {
                tagHTML: 'p',
                parent: '.card__body',
                classnames: ['card__body__price'],
                text: this.price,
            }
        }

        return this.getHierarchizedElementDOM (userCardSchema)
    }

    getUserMetaCardDOM () {
        const userMetaCardSchema = {
            article : {
                tagHTML: 'article',
                classnames: ['card'],
                root: true,
            },
            h1: {
                tagHTML: 'h1',                
                parent: '.card',
                classnames: ['card__title'],
                text: this.data.name
            },
            location : {
                tagHTML: 'div',
                parent: '.card',
                classnames: ['card__location'],
                text: this.location,
            },
            tagline : {
                tagHTML: 'p',
                parent: '.card',
                classnames: ['card__tagline'],
                text: this.data.tagline
            }
        }

        return this.getHierarchizedElementDOM (userMetaCardSchema)
    }

    getUserPortraitDOM () {

        const userPortraitSchema = {
            img: {
                tagHTML: 'img',
                root: true,
                attributes: {
                    src: this.imageSource,
                    alt: this.data.name
                }
            }
        }

        return this.getHierarchizedElementDOM(userPortraitSchema)

    }

}



function photographerPopupFactory () {

    function getLikeInfoPopup (price, totalLikes) {

        const popupElement = document.createElement('div')
        const likesElement = document.createElement('span')
        const likesCounterElement = document.createElement('span')
        const likesIconElement = document.createElement('span')
        const priceElement = document.createElement('span')

        popupElement.classList.add('popup')
        likesElement.classList.add('wrapper-likes')
        likesCounterElement.classList.add('likes-counter')
        likesIconElement.classList.add('fa-solid', 'fa-heart')
        priceElement.classList.add('wrapper-price')

        popupElement.appendChild(likesElement)
        likesElement.appendChild(likesCounterElement)
        likesElement.appendChild(likesIconElement)
        popupElement.appendChild(priceElement)

        likesCounterElement.textContent = totalLikes
        priceElement.textContent = `${price}€ / jour`

        return popupElement
    }

    return { getLikeInfoPopup }

}