import getData from "../utils/fetch.js" 
import UserFactory from "../components/user.js"
 

async function getPhotographers() {

    const data = await getData()
    return { photographers: data.photographers }

}

function displayData(photographers) {

    const sectionDOM = document.querySelector(".photographer__section")

    photographers.forEach((photographerData) => {
        const factory = new UserFactory(photographerData)
        const userCard = factory.getUserCardComponent()
        sectionDOM.appendChild(userCard)
    })

}

async function init() {

    const { photographers } = await getPhotographers()
    displayData(photographers)

}

init()
