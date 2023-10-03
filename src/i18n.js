import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { EN } from './Locales/en/translation';
import { ES } from './Locales/es/translation';

const resources = {
    EN: {
        translation: EN,
    },
    ES: {
        translation: ES,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'EN',

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
