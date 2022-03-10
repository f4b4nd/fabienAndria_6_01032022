import { sortMediaDatas } from "../utils/sortMedias.js"


export default class DropdownFactory {

    constructor (dropdown, currentOptionIndex) {
        this.dropdown = dropdown
        this.currentOptionIndex = currentOptionIndex
        this.options = this.dropdown.querySelectorAll('li')
        this.setDropdownEventListener()
        this.setOptionsEventListeners()
    }

    setCurrentOption (newIndex) {
        if (this.currentOptionIndex !== newIndex) {

            this.hideOption(this.currentOptionIndex)
            this.displayOption(newIndex)
         
            const optionID = this.options.item(newIndex)
            sortMediaDatas(optionID)

            this.currentOptionIndex = newIndex
        }
    }

    hideOption (idx) {
        this.options[idx].classList.remove('active')  
    }

    displayOption (idx) {
        this.options[idx].classList.add('active')  
    }

    openDropdownOptions () {
        if (this.dropdown.classList.contains('active')) {
            this.dropdown.classList.remove('active')
        } else {
            this.dropdown.classList.add('active')
        }     
    }

    setDropdownEventListener () {
        this.dropdown.addEventListener('click', () => this.openDropdownOptions())
    }

    setOptionsEventListeners () {
        Array.from(this.options).forEach((option, optionIndex) => {
           option.addEventListener('click', () => this.setCurrentOption(optionIndex))
        })
    }


}