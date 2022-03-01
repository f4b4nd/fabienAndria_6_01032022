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
    const mediaData = data.media.filter(v => v.photographerId.toString() === photographerID)

    const metaData = metaDatas.length > 0 ? metaDatas[0] : {}

    return { metaData, mediaData }
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

async function init () {
    const { metaData, mediaData } = await getPhotographerData()
    displayMetaData(metaData)
    console.log('meta', metaData)
    console.log('media', mediaData)
}


init()