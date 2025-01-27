import { FC, memo } from "react";
import { Breadcrumb } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { CrumbItem } from "@shared/ui/CrumbItem/CrumbItem";

export const MaterialCrumb: FC = memo(() => {
    const { t } = useTranslation(TranslationId.MATERIAL);

    return (
        <Breadcrumb
            items={[
                {
                    title: <CrumbItem icon={<InboxOutlined />} text={t("materialPage")} />,
                },
            ]}
        />
    );
});

MaterialCrumb.displayName = "MaterialCrumb";
