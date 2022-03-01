function getPhotographerID () {
    const urlQueryString = window.location.search
    const urlParams = new URLSearchParams(urlQueryString)
    const photographerID = urlParams.get('id')
    return photographerID
}

async function getPhotographerData () {

    const photographerID = getPhotographerID()
    const data = await getData()
    const metaData = data.photographers.filter(v => v.id.toString() === photographerID)
    const mediaData = data.media.filter(v => v.photographerId.toString() === photographerID)

    return { metaData, mediaData }
}

async function init () {
    const photographerData = await getPhotographerData()
    console.log('meta', photographerData.metaData)
    console.log('media', photographerData.mediaData)
}

init()