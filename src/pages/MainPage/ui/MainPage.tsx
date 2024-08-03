import { LangSwitcher } from "widgets/LangSwitcher";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { useTranslation } from "react-i18next";

const MainPage = () => {
    const { t } = useTranslation("main");
    return (
        <div>
            <p>{t("Main Page")}</p>
            <div>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
        </div>
    );
};

export default MainPage;
