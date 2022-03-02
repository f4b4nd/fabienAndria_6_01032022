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

    const metaTextSection = document.querySelector(".photograph__meta__text")
    const metaPortraitSection = document.querySelector('.photograph__meta__portrait')

    const photographerModel = photographerFactory(metaData)
    const userCardMetaDOM = photographerModel.getUserCardMetaDOM()
    const userPortraitDOM = photographerModel.getUserPortraitDOM()

    metaTextSection.appendChild(userCardMetaDOM)
    metaPortraitSection.appendChild(userPortraitDOM)

}

async function displayMediaDatas (mediaDatas) {
    const mediaSection = document.querySelector(".photograph__media .cards")

    const photographerModel = photographerMediasFactory()

    mediaDatas.forEach((mediaData) => {
        const mediaCardDOM = photographerModel.getMediaCardDOM(mediaData)
        mediaSection.appendChild(mediaCardDOM)
    })

}

function compareStringDates(a, b) {
    return new Date(b) - new Date(a)
}

async function orderMediaDatas(value) {

    clearMediaData ()

    const { mediaDatas } = await getPhotographerData()

    switch (value) {
        case 'popularity':
            mediaDatas.sort((a, b) => b.likes - a.likes)
            break

        case 'date':
            mediaDatas.sort((a, b) => compareStringDates(a.date, b.date))
            break
            
        case 'title':
            mediaDatas.sort((a, b) => a.title.localeCompare(b.title))
            break
    }
    
    displayMediaDatas(mediaDatas)

}

function clearMediaData () {
    const mediaSection = document.querySelector(".photograph__media .cards")
    while (mediaSection.firstChild) {
        mediaSection.removeChild(mediaSection.lastChild)
    }
}

async function init () {
    const { metaData, mediaDatas } = await getPhotographerData()
    displayMetaData(metaData)
    displayMediaDatas(mediaDatas)
    console.log('meta', metaData)
    console.log('media', mediaDatas)
}

init()