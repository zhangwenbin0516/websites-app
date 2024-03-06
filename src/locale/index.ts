import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zhCN from './zh-cn'
import zhHK from './zh-hk'
import en from './en'
const resources = {
    en: {
        translation: en
    },
    'zh-CN': {
        translation: zhCN
    },
    'zh-HK': {
        translation: zhHK
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