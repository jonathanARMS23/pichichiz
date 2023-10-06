import I18n from 'i18next'
import { initReactI18next } from 'react-i18next'

I18n.use(initReactI18next).init({
    fallbackLng: 'fr',
    ns: ['./locales/fr', './locales/en', './locales/es'],
    defaultNS: './locales/fr',
    debug: true,
    interpolation: {
        escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
},(err) => {
    if (err) console.log('something went wrong on i18next initialization !')
})
export default I18n
