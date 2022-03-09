import { getData } from "../utils/fetch.js"
import { PhotographerFactory } from "../factories/photographer.js"
import { PhotographerMediasFactory } from "../factories/media.js"

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

async function displayMetaData (metaData) {

    const metaTextSection = document.querySelector(".photograph__meta__text")
    const metaPortraitSection = document.querySelector('.photograph__meta__portrait')

    const model = new PhotographerFactory(metaData)
    const userCardMetaDOM = model.getUserMetaCardDOM()
    const userPortraitDOM = model.getUserPortraitDOM()

    metaTextSection.appendChild(userCardMetaDOM)
    metaPortraitSection.appendChild(userPortraitDOM)

}

export async function displayMediaDatas (mediaDatas) {

    const section = document.querySelector(".photograph__media .cards")

    mediaDatas.forEach((mediaData) => {
        const model = new PhotographerMediasFactory(mediaData)
        const mediaCardDOM = model.getMediaCardDOM()
        section.appendChild(mediaCardDOM)        
    })

}

async function displayUserPopup (metaData, mediaDatas) {

    const section = document.querySelector(".photograph__popup")
    const totalLikes = Object.values(mediaDatas).reduce((acc, current) => acc + current.likes, 0)
    console.log('total', totalLikes)

    const price = metaData.price

    const model = photographerPopupFactory()

    const popupDOM = model.getLikeInfoPopup(price, totalLikes)
    section.appendChild(popupDOM)

}



async function init () {
    const { metaData, mediaDatas } = await getPhotographerData()
    displayMetaData(metaData)
    displayMediaDatas(mediaDatas)
    displayUserPopup (metaData, mediaDatas)
    console.log('meta', metaData)
    console.log('media', mediaDatas)
}

init()