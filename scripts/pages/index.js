
async function getPhotographers() {

    const data = await getData()
    return { photographers: data.photographers }

}

async function displayData(photographers) {

    const sectionDOM = document.querySelector(".photographer_section")

    photographers.forEach((photographerData) => {
        const model = new PhotographerFactory(photographerData)
        const userCardDOM = model.getUserCardDOM()
        sectionDOM.appendChild(userCardDOM)
    })

}

async function init() {

    const { photographers } = await getPhotographers()
    displayData(photographers)

}

init()
