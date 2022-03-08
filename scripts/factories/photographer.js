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
    /* 
    elements = {
        article: {
            type: 'div'
            classnames: ['card', 'user-card'],
        },
        image : {
            type : 'img',
            parent : 'article',
            classnames : ['img', 'img-black'],
            attributes: {
                src: 'assets/photographers',
                alt: 'je suis rouge'
            }
        },
        h2 : {
            type: 'div',
            parent : 'article',
            classnames : ['title'],
            text: 'je suis un titre',
        }
    }
     
    */

    createHierarchizedDOMElement (elements) {
        

        const reducedElement = Object.values(elements).reduce((accumulator, currentElement) => {

            const accumulatorDOM = accumulator instanceof HTMLElement ? accumulator : this.createDOMElement(accumulator)
            const currentDOM =  this.createDOMElement (currentElement)   
            
            if (currentElement.parent) {
                let parentDOM =  accumulatorDOM.querySelector(currentElement.parent) || accumulatorDOM
                parentDOM.appendChild(currentDOM)         
            }
       
            return accumulatorDOM
            
        })

        return reducedElement
    }


    createDOMElement (element) {
            
        const elementOnDOM = document.createElement(element.tagHTML)

        if (element.classnames) {
            element.classnames.forEach(classname => elementOnDOM.classList.add(classname))
        }

        if (element.attributes) {
            Object.entries(element.attributes).forEach(([attributeName, attributeValue]) => elementOnDOM.setAttribute(attributeName, attributeValue))
        }

        if (element.text) {
            elementOnDOM.textContent = element.text
        }

        return elementOnDOM

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
                classnames: ['card__header'],
                attributes: {
                    href: this.urlPhotographer
                },
                parent : '.card'
            },
            imageContainer : {
                tagHTML: 'div',
                classnames: ['card__header__image'],
                parent: '.card__header',
            },
            img: {
                tagHTML: 'img',
                attributes : {
                    alt: this.data.tagline,
                    src: this.imageSource
                },
                parent: '.card__header__image'
            },
            h2 : {
                tagHTML: 'h2',
                classnames: ['card__header__title'],
                text: this.data.name,
                parent: '.card__header'
            },
            bodyContainer : {
                tagHTML: 'div',
                classnames: ['card__body'],
                parent: '.card'
            },
            location : {
                tagHTML: 'div',
                classnames: ['card__body__location'],
                text: this.location,
                parent: '.card__body'
            },
            tagline : {
                tagHTML: 'div',
                classnames: ['card__body__tagline'],
                text: this.data.tagline, 
                parent: '.card__body'             
            },
            price : {
                tagHTML: 'div',
                classnames: ['card__body__price'],
                text: this.price,
                parent: '.card__body'
            }
        }

        return this.createHierarchizedDOMElement (userCardSchema)
    }
}

function photographerFactory(data) {

    const { name, portrait } = data

    const picture = `assets/photographers/${portrait}`
    const urlPhotographer = `photographer.html?id=${data.id}`
    const location = `${data.city}, ${data.country}`
    const tagline = data.tagline
    const price = `${data.price}€/jour`

    function getUserCardDOM() {

        const articleElement = document.createElement('article')
        const aElement = document.createElement('a')
        const imageContainerElement = document.createElement('div')
        const bodyContainerElement = document.createElement('div')

        const imgElement = document.createElement('img')
        const h2Element = document.createElement('h2')
        const locationElement = document.createElement('div')
        const taglineElement = document.createElement('div')
        const priceElement = document.createElement('div')

        aElement.setAttribute('href', urlPhotographer)
        imgElement.setAttribute("src", picture)
        imgElement.setAttribute('alt', name)

        h2Element.textContent = data.name
        locationElement.textContent = location
        taglineElement.textContent = tagline
        priceElement.textContent = price        
        
        imageContainerElement.classList.add('article__image')
        bodyContainerElement.classList.add('article__body')
        locationElement.classList.add('location')
        taglineElement.classList.add('tagline')
        priceElement.classList.add('price')

        articleElement.appendChild(aElement)
        articleElement.appendChild(bodyContainerElement)

        aElement.appendChild(imageContainerElement)
        aElement.appendChild(h2Element)

        imageContainerElement.appendChild(imgElement)
        bodyContainerElement.appendChild(locationElement)
        bodyContainerElement.appendChild(taglineElement)
        bodyContainerElement.appendChild(priceElement)

        return articleElement

    }

    function getUserCardMetaDOM () {

        const articleElement = document.createElement('article')
        const h1Element = document.createElement('h1')
        const locationElement = document.createElement('p')
        const taglineElement = document.createElement('p')
    
        h1Element.textContent = name
        locationElement.textContent = location
        taglineElement.textContent = tagline
    
        articleElement.appendChild(h1Element)
        articleElement.appendChild(locationElement)
        articleElement.appendChild(taglineElement)

        return articleElement

    }

    function getUserPortraitDOM () {
        const imgElement = document.createElement('img')
        imgElement.setAttribute("src", picture)

        return imgElement
    }


    return { name, picture, getUserCardDOM, getUserCardMetaDOM, getUserPortraitDOM }
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