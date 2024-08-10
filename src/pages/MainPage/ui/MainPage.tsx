import { useTranslation } from "react-i18next";

const MainPage = () => {
    const { t } = useTranslation("main");
    return (
        <div>
            <p>{t("Main Page")}</p>
        </div>
    );
};

export default MainPage;
