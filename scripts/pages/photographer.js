import getData from "../utils/fetch.js"
import PhotographerFactory  from "../factories/photographer.js"
import PhotographerMediasFactory from "../factories/media.js"
import PhotographerPopupFactory from "../factories/popup.js"

function getPhotographerID () {
    const urlQueryString = window.location.search
    const urlParams = new URLSearchParams(urlQueryString)
    const photographerID = urlParams.get('id')
    return photographerID
}

export async function getPhotographerData () {

    const photographerID = getPhotographerID()
    const data = await getData()
    const metaDatas = data.photographers.filter(v => v.id.toString() === photographerID)
    const mediaDatas = data.media.filter(v => v.photographerId.toString() === photographerID)

    const metaData = metaDatas.length > 0 ? metaDatas[0] : {}

    return { metaData, mediaDatas }
}

function displayMetaData (metaData) {

    const textSection = document.querySelector(".photograph__meta__text")
    const portraitSection = document.querySelector('.photograph__meta__portrait')

    const model = new PhotographerFactory(metaData)
    const userCardMetaDOM = model.getUserMetaCardDOM()
    const userPortraitDOM = model.getUserPortraitDOM()

    textSection.appendChild(userCardMetaDOM)
    portraitSection.appendChild(userPortraitDOM)

}

export function displayMediaDatas (mediaDatas) {

    const section = document.querySelector(".photograph__media .cards")

    mediaDatas.forEach((mediaData) => {
        const model = new PhotographerMediasFactory(mediaData)
        const mediaCardDOM = model.getMediaCardDOM()
        section.appendChild(mediaCardDOM)        
    })

}

//const likes = document.querySelectorAll('.card__body__likes-counter')
//likes[0].addEventListener('change', () => {console.log('changé')})

function displayPopupData (metaData, mediaDatas) {

    const section = document.querySelector(".photograph__popup")

    const totalLikes = Object.values(mediaDatas).reduce((acc, current) => acc + current.likes, 0)
    const price = metaData.price

    const model = new PhotographerPopupFactory(totalLikes, price)
    const popupDOM = model.getPhotographerPopupDOM()
    section.appendChild(popupDOM)

}


async function init () {
    const { metaData, mediaDatas } = await getPhotographerData()
    displayMetaData(metaData)
    displayMediaDatas(mediaDatas)
    displayPopupData (metaData, mediaDatas)
    console.log('meta', metaData)
    console.log('media', mediaDatas)
}

init()