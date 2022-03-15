export function currentURLIsValid () {

    const currentURL = `${window.location.href}`

    const acceptedRoutes = [
        /index.html$/gm,
        /photographer.html\?id=\d+$/gm
    ]

    const matches = acceptedRoutes.filter(route => currentURL.match(route))

    const currentURLIsValid = matches.length > 0

    return currentURLIsValid

}


export function redirectToHomepage () {
    window.location.replace("index.html")
}