import AbstractFactory from "./abstract.js"

export default class LikesCounterPopupFactory extends AbstractFactory {

    constructor (totalLikes, price) {
        super()
        this.totalLikesCounter = totalLikes
        this.price = `${price}€ / jour`
    }

    getLikesCounterPopupComponent () {

        const likesCounterPopupSchema = {
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
                text: this.totalLikesCounter,
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

        return this.getHierarchizedComponent(likesCounterPopupSchema)
    }

}

