import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';

import enLocale from './en';

Vue.use(VueI18n);

const messages = {
    en: {
        ...enLocale,
    }
};

export function getLanguage() {
    const chooseLanguage = Cookies.get('language');
    if (chooseLanguage) {
        return chooseLanguage;
    }

    // if has not choose language
    const language = (navigator.language || navigator.browserLanguage).toLowerCase();
    const locales = Object.keys(messages);
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale;
        }
    }

    // default language
    return 'en';
}

const i18n = new VueI18n({
    // set locale
    // options: en, ...
    locale: getLanguage(),
    // set locale messages
    messages,
});

export default i18n;
