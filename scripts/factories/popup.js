import AbstractFactory from "./abstract.js"

export default class PhotographerPopupFactory extends AbstractFactory {

    constructor (totalLikes, price) {
        super()
        this.totalLikes = totalLikes
        this.price = `${price}€ / jour`
    }

    getPhotographerPopupDOM () {

        const photographerPopupSchema = {
            popup: {
                tagHTML: 'div',
                root: true,
                classnames: ['popup'],
            },
            likesWrapper: {
                tagHTML: 'div',
                parent: '.popup',
                classnames: ['popup__likes-wrapper'],
            },
            totalLikesCounter: {
                tagHTML: 'p',
                parent: '.popup__likes-wrapper',
                classnames: ['popup__total-likes-counter'],
                text: this.totalLikes
            },
            likesIcon: {
                tagHTML: 'div',
                parent: '.popup__likes-wrapper',
                classnames: ['popup__likes-icon', 'fa-solid', 'fa-heart'],
            },
            price: {
                tagHTML: 'div',
                parent: '.popup',
                classnames: ['popup__price'],
                text: this.price
            }
        }

        return this.getHierarchizedElementDOM(photographerPopupSchema)
    }
}

