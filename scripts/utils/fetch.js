export default async function getData () {

    const localeURL = 'data/photographers.json'
    const remoteURL = 'https://f4b4nd.github.io/fabienAndria_6_01032022/data/photographers.json'
    
    let response = await fetch(localeURL)

    if (!response.ok) {
        response = await fetch(remoteURL)
        console.log('loaded from github.io')
    }

    const data = await response.json()

    return data
}