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

    function getImageMediaCardDOM (mediaData) {

        const { id, title, image, video, likes } = mediaData

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
        likesCounterElement.classList.add('likes-counter')
        likesIconElement.classList.add('fa-solid', 'fa-heart')

        articleElement.onclick = function () { displayLightbox() }

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
        likesCounterElement.classList.add('likes-counter')
        likesIconElement.classList.add('fa-solid', 'fa-heart')

        articleElement.onclick = function () { displayLightbox() }

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