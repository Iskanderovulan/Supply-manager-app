import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en", // Резервный язык
        // debug: __IS_DEV__,
        interpolation: {
            escapeValue: false, // Не нужно для React, так как он экранирует значения по умолчанию
        },
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
        detection: {
            order: ["localStorage"],
            caches: ["localStorage"],
        },
    });

export default i18n;
