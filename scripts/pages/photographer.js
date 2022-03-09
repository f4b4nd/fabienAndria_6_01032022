import getData from "../utils/fetch.js"
import UserFactory  from "../components/user.js"
import MediasFactory from "../components/media.js"
import LikesCounterPopupFactory from "../components/popup.js"

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

    const factory = new UserFactory(metaData)
    const userCardMeta = factory.getUserMetaCardComponent()
    const userPortrait = factory.getUserPortraitComponent()

    const textSection = document.querySelector(".photograph__meta__text")
    const portraitSection = document.querySelector('.photograph__meta__portrait')

    textSection.appendChild(userCardMeta)
    portraitSection.appendChild(userPortrait)

}

export function displayMediaDatas (mediaDatas) {

    const section = document.querySelector(".photograph__media .cards")

    mediaDatas.forEach((mediaData) => {
        const factory = new MediasFactory(mediaData)
        const mediaCard = factory.getMediaCardComponent()
        section.appendChild(mediaCard)        
    })

}


function displayPopupData (metaData, mediaDatas) {

    const totalLikes = Object.values(mediaDatas).reduce((acc, current) => acc + current.likes, 0)
    const price = metaData.price

    const factory = new LikesCounterPopupFactory(totalLikes, price)
    const likesCounterPopup = factory.getLikesCounterPopupComponent()

    const section = document.querySelector(".photograph__popup")
    section.appendChild(likesCounterPopup)

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
