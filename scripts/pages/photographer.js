function getPhotographerID () {
    const urlQueryString = window.location.search
    const urlParams = new URLSearchParams(urlQueryString)
    const photographerID = urlParams.get('id')
    return photographerID
}

async function getPhotographerData () {

    const photographerID = getPhotographerID()
    const data = await getData()
    const metaDatas = data.photographers.filter(v => v.id.toString() === photographerID)
    const mediaDatas = data.media.filter(v => v.photographerId.toString() === photographerID)

    const metaData = metaDatas.length > 0 ? metaDatas[0] : {}

    return { metaData, mediaDatas }
}

async function displayMetaData (metaData) {

    const metaSection = document.querySelector(".photograph__meta")
    const portraitSection = document.querySelector('.photograph__portrait')

    const photographerModel = photographerFactory(metaData)
    const userCardMetaDOM = photographerModel.getUserCardMetaDOM()
    const userPortraitDOM = photographerModel.getUserPortraitDOM()

    metaSection.appendChild(userCardMetaDOM)
    portraitSection.appendChild(userPortraitDOM)

}

async function displayMediaDatas (mediaDatas) {
    const mediaSection = document.querySelector(".photograph__media")

    const photographerModel = photographerMediasFactory()

    mediaDatas.forEach((mediaData) => {
        const mediaCardDOM = photographerModel.getMediaCardDOM(mediaData)
        mediaSection.appendChild(mediaCardDOM)
    })

}

async function init () {
    const { metaData, mediaDatas } = await getPhotographerData()
    displayMetaData(metaData)
    displayMediaDatas(mediaDatas)
    console.log('meta', metaData)
    console.log('media', mediaDatas)
}


init()