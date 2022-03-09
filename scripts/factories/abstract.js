export default class AbstractFactory {

    getElementDOM (elementSchema) {
            
        const elementDOM = document.createElement(elementSchema.tagHTML)

        if (elementSchema.classnames) {
            elementSchema.classnames.forEach(classname => elementDOM.classList.add(classname))
        }

        if (elementSchema.attributes) {
            Object.entries(elementSchema.attributes).forEach(([attributeName, attributeValue]) => elementDOM.setAttribute(attributeName, attributeValue))
        }

        if (elementSchema.text) {
            elementDOM.textContent = elementSchema.text
        }

        if (elementSchema.onclick) {
            const callback = elementSchema.onclick
            elementDOM.onclick = function () { callback() }
        }

        if (elementSchema.eventListener) {
            elementDOM.addEventListener('click',  (elementDOM) => elementSchema.eventListener(elementDOM))
        }

        return elementDOM

    }

    getHierarchizedElementDOM (elementSchema) {
        
        if (Object.keys(elementSchema).length === 1) {
            const key = Object.keys(elementSchema)[0]
            return this.getElementDOM(elementSchema[key])          
        }

        const hierarchizedElementDOM = Object.values(elementSchema).reduce((accumulator, currentElementSchema) => {

            const accumulatorDOM = accumulator instanceof HTMLElement ? accumulator : this.getElementDOM(accumulator)
            const currentElementDOM = this.getElementDOM(currentElementSchema)   
            
            if (currentElementSchema.parent) {
                const parentDOM = accumulatorDOM.querySelector(currentElementSchema.parent) || accumulatorDOM
                parentDOM.appendChild(currentElementDOM)         
            }
       
            return accumulatorDOM
            
        })

        return hierarchizedElementDOM
    }


}