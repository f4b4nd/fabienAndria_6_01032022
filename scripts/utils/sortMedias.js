import { getPhotographerData, displayMediaDatas } from "../pages/photographer.js"
import clearHTMLNode from "./clearHTMLNode.js"

const dropdownOrderby = document.querySelector('#dropdown-orderby')

dropdownOrderby.addEventListener('click', function() {
    if (!this.classList.contains('active')) {
        this.classList.add('active')
    } 
    else {
        this.classList.remove('active')
    }
})

const popularityDropdownOption = dropdownOrderby.querySelector('li#popularity')
const dateDropdownOption = dropdownOrderby.querySelector('li#date')
const titleDrodownOption = dropdownOrderby.querySelector('li#title')

popularityDropdownOption.addEventListener('click', handleDropdownClick) 
dateDropdownOption.addEventListener('click', handleDropdownClick)
titleDrodownOption.addEventListener('click', handleDropdownClick)

function handleDropdownClick () {
    if (!this.classList.contains('active')) {
        this.classList.add('active')
        sortMediaDatas(this.id)
    } 
    else {
        this.classList.remove('active')
    }
}


async function sortMediaDatas(value) {

    const section = document.querySelector(".photograph__media .cards")
    clearHTMLNode (section)

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



function compareStringDates(a, b) {
    return new Date(b) - new Date(a)
}