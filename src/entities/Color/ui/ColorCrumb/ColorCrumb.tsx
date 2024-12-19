import { FC, memo } from "react";
import { Breadcrumb } from "antd";
import { useTranslation } from "react-i18next";
import { BgColorsOutlined } from "@ant-design/icons";
import { TranslationId } from "@shared/const/translation";
import { CrumbItem } from "@shared/ui/CrumbItem/CrumbItem";

export const ColorCrumb: FC = memo(() => {
    const { t } = useTranslation(TranslationId.COLOR);

    return (
        <Breadcrumb
            items={[
                {
                    title: <CrumbItem icon={<BgColorsOutlined />} text={t("colorPage")} />,
                },
            ]}
        />
    );
});

ColorCrumb.displayName = "ColorCrumb";
