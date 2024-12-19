import { FC, memo } from "react";
import { Breadcrumb } from "antd";
import { useTranslation } from "react-i18next";
import { AppstoreOutlined } from "@ant-design/icons";
import { TranslationId } from "@shared/const/translation";
import { CrumbItem } from "@shared/ui/CrumbItem/CrumbItem";

export const PackCrumb: FC = memo(() => {
    const { t } = useTranslation(TranslationId.PACK);

    return (
        <Breadcrumb
            items={[
                {
                    title: <CrumbItem icon={<AppstoreOutlined />} text={t("packPage")} />,
                },
            ]}
        />
    );
});

PackCrumb.displayName = "PackCrumb";
