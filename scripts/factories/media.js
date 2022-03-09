
export function photographerMediasFactory () {

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