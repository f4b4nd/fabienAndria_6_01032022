async function getData () {
    const response = await fetch('../../data/photographers.json')
    const data = await response.json()
    return data
}

function photographerFactory(data) {

    const { name, portrait } = data

    const picture = `assets/photographers/${portrait}`
    const urlPhotographer = `photographer.html?id=${data.id}`
    const locationTextContent = `${data.city}, ${data.country}`
    const taglineTextContent = data.tagline
    const priceTextContent = `${data.price}€/jour`

    function getUserCardDOM() {

        const article = document.createElement('article')
        const a = document.createElement('a')
        const img = document.createElement('img')
        const h2 = document.createElement('h2')
        const location = document.createElement('div')
        const tagline = document.createElement('div')
        const price = document.createElement('div')

        a.setAttribute('href', urlPhotographer)
        img.setAttribute("src", picture)
        img.setAttribute('alt', name)

        h2.textContent = data.name
        location.textContent = locationTextContent
        tagline.textContent = taglineTextContent
        price.textContent = priceTextContent

        location.classList.add('location')
        tagline.classList.add('tagline')
        price.classList.add('price')

        article.appendChild(a)
        a.appendChild(img)
        a.appendChild(h2)
        a.appendChild(location)
        a.appendChild(tagline)
        a.appendChild(price)

        return article

    }

    function getUserCardMetaDOM () {

        const article = document.createElement('article')
        const h1 = document.createElement('h1')
        const location = document.createElement('p')
        const tagline = document.createElement('p')
    
        h1.textContent = name
        location.textContent = locationTextContent
        tagline.textContent = taglineTextContent
    
        article.appendChild(h1)
        article.appendChild(location)
        article.appendChild(tagline)

        return article

    }

    function getUserPortraitDOM () {
        const img = document.createElement('img')
        img.setAttribute("src", picture)

        return img
    }

    return { name, picture, getUserCardDOM, getUserCardMetaDOM, getUserPortraitDOM }
}

function photographerMediasFactory () {

    function getMediaCardDOM (mediaData) {

        const { id, title, image, likes } = mediaData

        const picture = `assets/media/${image}`

        const article = document.createElement('article')

        const titleParagraph = document.createElement('p')
        const img = document.createElement('img')

        titleParagraph.textContent = title
        img.setAttribute('src', picture)
        img.setAttribute('alt', title)

        article.appendChild(titleParagraph)
        article.appendChild(img)

        return article
    }

    return { getMediaCardDOM }
}