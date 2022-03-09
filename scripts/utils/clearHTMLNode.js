export default function clearHTMLNode (htmlNode) {

    while (htmlNode.firstChild) {
        htmlNode.removeChild(htmlNode.lastChild)
    }

}