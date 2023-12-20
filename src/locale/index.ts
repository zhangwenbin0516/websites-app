import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import cnHome from './zh-cn/home.json'
import hkHome from './zh-hk/home.json'
import enHome from './en/home.json'
const resources = {
    en: {
        translation: {
            home: enHome
        }
    },
    'zh-CN': {
        translation: {
            home: cnHome
        }
    },
    'zh-HK': {
        translation: {
            hk: hkHome
        }
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'zh-CN',
        interpolation: {
            escapeValue: false
        },
    })
export default i18n