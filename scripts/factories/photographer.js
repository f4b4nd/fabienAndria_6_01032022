function photographerFactory(data) {

    const { name, portrait } = data

    const picture = `assets/photographers/${data.portrait}`

    function getUserCardDOM() {

        const article = document.createElement('article')
        const img = document.createElement('img')
        const h2 = document.createElement('h2')
        const location = document.createElement('div')
        const tagline = document.createElement('div')
        const price = document.createElement('div')

        img.setAttribute("src", picture)
        h2.textContent = data.name
        location.textContent = `${data.city}, ${data.country}`
        tagline.textContent = data.tagline
        price.textContent = `${data.price}€/jour`

        location.classList.add('location')
        tagline.classList.add('tagline')
        price.classList.add('price')

        article.appendChild(img)
        article.appendChild(h2)
        article.appendChild(location)
        article.appendChild(tagline)
        article.appendChild(price)

        return article

    }

    return { name, picture, getUserCardDOM }
}