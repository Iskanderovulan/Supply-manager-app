import { FC, memo } from "react";
import { Breadcrumb, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { InboxOutlined } from "@ant-design/icons";
import { TranslationId } from "@shared/const/translation";
import cls from "./MaterialCrumb.module.scss";

const { Text } = Typography;

export const MaterialCrumb: FC = memo(() => {
    const { t } = useTranslation(TranslationId.MATERIAL);

    return (
        <Breadcrumb
            items={[
                {
                    title: (
                        <Text keyboard>
                            <InboxOutlined className={cls.icon} />
                            {t("materialPage")}
                        </Text>
                    ),
                },
            ]}
        />
    );
});

MaterialCrumb.displayName = "MaterialCrumb";
