import { sortMediaDatas } from "../utils/sortMedias.js"


export default class DropdownFactory {

    constructor (dropdown, currentOptionIndex) {
        this.dropdown = dropdown
        this.currentOptionIndex = currentOptionIndex
        this.optionsWrapper = this.dropdown.querySelector('ul')
        this.options = this.dropdown.querySelectorAll('li')
        this.setDropdownEventListener()
        this.setOptionsEventListeners()
    }

    setCurrentOption (newIndex) {

        if (this.currentOptionIndex === newIndex) return

        this.unsetOption(this.currentOptionIndex)
        this.setOption(newIndex)

        const optionID = this.options.item(newIndex).id
        sortMediaDatas(optionID)

        this.currentOptionIndex = newIndex

    }

    unsetOption (idx) {
        this.options[idx].classList.remove('active')
    }

    setOption (idx) {
        const optionID = this.options.item(idx).id
        this.optionsWrapper.setAttribute('aria-activedescendant', optionID)
        this.options[idx].classList.add('active')
    }

    openDropdownOptions () {
        if (this.dropdown.classList.contains('active')) {
            this.dropdown.classList.remove('active')
            return
        }
        this.dropdown.classList.add('active')
    }

    setDropdownEventListener () {
        this.dropdown.addEventListener('click', () => this.openDropdownOptions())
    }

    setOptionsEventListeners () {
        [...this.options].forEach((option, optionIndex) => {
            option.addEventListener('click', () => this.setCurrentOption(optionIndex))
            option.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.setCurrentOption(optionIndex) })
        })
    }


}