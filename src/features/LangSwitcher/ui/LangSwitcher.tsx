import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

export const LangSwitcher = () => {
    const { t: global, i18n } = useTranslation();

    const toggle = async () => {
        const newLanguage = i18n.language === "ru" ? "en" : "ru";
        await i18n.changeLanguage(newLanguage);
    };

    return (
        <Button onClick={toggle} icon={<GlobalOutlined />}>
            {global("switcher")}
        </Button>
    );
};
