import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { LOCAL_STORAGE_LANG_KEY } from "@shared/const/localstorage";

export const LangSwitcher = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const savedLanguage = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);
        if (savedLanguage && savedLanguage !== i18n.language) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    const toggle = async () => {
        const newLanguage = i18n.language === "ru" ? "en" : "ru";
        await i18n.changeLanguage(newLanguage);
        localStorage.setItem(LOCAL_STORAGE_LANG_KEY, newLanguage);
    };

    return <Button onClick={toggle}>{t("switcher.label")}</Button>;
};
