import { getPhotographerData, displayMediaDatas } from "../pages/photographer.js"
import DropdownFactory from "../factory/dropdown.js"
import clearHTMLNode from "./clearHTMLNode.js"


export function getDropdown () {

    const dropdown = document.querySelector('#dropdown-selector')
    new DropdownFactory(dropdown, 0)

} 


export async function sortMediaDatas(value) {

    const section = document.querySelector(".photograph__media .cards")
    clearHTMLNode (section)

    const { mediaDatas } = await getPhotographerData()

    switch (value) {
        case 'popularity':
            mediaDatas.sort((a, b) => b.likes - a.likes)
            break

        case 'date':
            mediaDatas.sort((a, b) => new Date(b.date) - new Date(a.date))
            break
            
        case 'title':
            mediaDatas.sort((a, b) => a.title.localeCompare(b.title))
            break
    }
    
    displayMediaDatas(mediaDatas)

}
