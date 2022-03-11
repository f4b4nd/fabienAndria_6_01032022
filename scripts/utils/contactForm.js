function getModal () {

    modalDOM = document.getElementById("contact_modal")
    const modal = new ModalFactory(modalDOM)
    modal.displayModal()
    modal.setUsernameInfo()

    const closeModalBtn = modalDOM.querySelector('.close-btn')
    closeModalBtn.onclick = () => modal.closeModal()

    const submitModalBtn = modalDOM.querySelector('.submit-btn')
    submitModalBtn.onclick = (e) =>  modal.submitForm(e)
    
}


class ModalFactory {
    
    constructor (modal) {
        this.modal = modal
        this.form = this.modal.querySelector('form')
    }

    displayModal () {
        this.modal.style.display = "block"
    }

    closeModal () {
        this.modal.style.display = "none"
    }

    setUsernameInfo() {
        const sectionDOM = this.modal.querySelector('h3')
        sectionDOM.textContent = this.getUsernameInfo()
    }

    getUsernameInfo () {
        const name = document.querySelector('.photograph__meta__text .card__title')
        return name.textContent
    }

    getInputDatas() {
        const inputs = this.form.querySelectorAll('input')
        const datas = [...inputs].map(input => `${input.id}: "${input.value || null}"`)
        return datas
    }

    submitForm (e) {
        e.preventDefault()
        const inputDatas = this.getInputDatas()
        console.log('your data here --> ', inputDatas.join(' ; '))
        this.closeModal()
        this.form.reset()
    }

}