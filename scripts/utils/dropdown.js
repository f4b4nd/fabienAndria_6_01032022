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
        orderMediaDatas(this.id)
    } 
    else {
        this.classList.remove('active')
    }
}
