async function getData () {

    const localeURL = 'data/photographers.json'
    const remoteURL = 'https://f4b4nd.github.io/fabienAndria_6_01032022/data/photographers.json'
    
    let response = await fetch(localeURL)

    if (!response.ok) {
        response = await fetch(remoteURL)
        console.log('loaded from github.io')
    }

    const data = await response.json()

    return data
}

class AbstractFactory {

    createHierarchizedElement (elementSchema) {
        
        if (Object.keys(elementSchema).length === 1) {
            const elementSchemaValue = Object.values(elementSchema)[0]
            return this.createElement(elementSchemaValue)          
        }

        const hierarchizedElementDOM = Object.values(elementSchema).reduce((accumulator, currentSchema) => {

            const accumulatorDOM = accumulator instanceof HTMLElement ? accumulator : this.createElement(accumulator)
            const currentDOM =  this.createElement (currentSchema)   
            
            if (currentSchema.parent) {
                let parentDOM =   accumulatorDOM.querySelector(currentSchema.parent) || accumulatorDOM
                parentDOM.appendChild(currentDOM)         
            }
       
            return accumulatorDOM
            
        })

        return hierarchizedElementDOM
    }


    createElement (elementSchema) {
            
        const elementDOM = document.createElement(elementSchema.tagHTML)

        if (elementSchema.classnames) {
            elementSchema.classnames.forEach(classname => elementDOM.classList.add(classname))
        }

        if (elementSchema.attributes) {
            Object.entries(elementSchema.attributes).forEach(([attributeName, attributeValue]) => elementDOM.setAttribute(attributeName, attributeValue))
        }

        if (elementSchema.text) {
            elementDOM.textContent = elementSchema.text
        }

        return elementDOM

    }

}

class PhotographerFactory extends AbstractFactory {

    constructor (data) {
        super()
        this.data = data
        this.urlPhotographer = `photographer.html?id=${this.data.id}`
        this.imageSource = `assets/photographers/${this.data.portrait}`
        this.location = `${this.data.city}, ${this.data.country}`
        this.price = `${this.data.price}€/jour`
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

        return this.createHierarchizedElement (userCardSchema)
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

        return this.createHierarchizedElement (userMetaCardSchema)
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

        return this.createHierarchizedElement(userPortraitSchema)

    }

}

function photographerMediasFactory () {

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