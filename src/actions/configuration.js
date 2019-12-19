import {
    LANGUAGE_SET
} from '../constants/configuration'

export const setLanguage = (lang) => ({
    type : LANGUAGE_SET,
    payload: lang,
})