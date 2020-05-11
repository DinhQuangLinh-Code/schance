import axios from 'axios'

const key = 'schance-i18n'
export const initLanguage = async () => {
    let language = getLanguageFromLocal()
    if (!language) {
        let resp = await axios.get('https://assets.schance.com.vn/assets/v1/language')
        sessionStorage.setItem(key, JSON.stringify(resp.data))
        return resp.data
    }
    return JSON.parse(language)
}

const getLanguageFromLocal = () => {
    return sessionStorage.getItem(key)
}

export const setLocal = (key, value) => {
    if (process.browser) {
        setTimeout(() => {
            localStorage.setItem(key, JSON.stringify(value))
        }, 1000)
    }
}

export const getLocal = key => {
    return localStorage.getItem(key)
}
