async function getData () {
    const response = await fetch('../../data/photographers.json')
    const data = await response.json()
    return data
}

function photographerFactory(data) {

    const { name, portrait, id } = data

    const picture = `assets/photographers/${data.portrait}`
    const urlPhotographer = `photographer.html?id=${data.id}`

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
        h2.textContent = data.name
        location.textContent = `${data.city}, ${data.country}`
        tagline.textContent = data.tagline
        price.textContent = `${data.price}€/jour`

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

    return { name, picture, id, getUserCardDOM }
}