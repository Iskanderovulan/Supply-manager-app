import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    debug: false,
    resources: {
        en: {
            translation: {
                "Not Found Page": "Not Found Page",
                "Loading...": "Loading...",
                "Protected:": "Protected:",
                "Some Page Content": "Some Page Content",
            },
        },
    },
    interpolation: {
        escapeValue: false,
    },
});

export { i18n as i18nForTests };
