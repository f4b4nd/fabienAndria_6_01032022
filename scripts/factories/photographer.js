async function getData () {
    const response = await fetch('../../data/photographers.json')
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

        locationElement.classList.add('location')
        taglineElement.classList.add('tagline')
        priceElement.classList.add('price')

        articleElement.appendChild(aElement)
        aElement.appendChild(imgElement)
        aElement.appendChild(h2Element)
        aElement.appendChild(locationElement)
        aElement.appendChild(taglineElement)
        aElement.appendChild(priceElement)

        return article

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

    function getMediaCardDOM (mediaData) {

        const { id, title, image, likes } = mediaData

        const picture = `assets/media/${image}`

        const articleElement = document.createElement('article')
        const titleElement = document.createElement('p')
        const imgElement = document.createElement('img')
        const likesElement = document.createElement('span')

        titleElement.textContent = title
        imgElement.setAttribute('src', picture)
        imgElement.setAttribute('alt', title)
        likesElement.textContent = likes

        articleElement.appendChild(titleElement)
        articleElement.appendChild(imgElement)
        articleElement.appendChild(likesElement)

        return articleElement
    }

    return { getMediaCardDOM }
}