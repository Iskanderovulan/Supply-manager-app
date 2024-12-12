import { FC, memo } from "react";
import { Breadcrumb, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { AppstoreOutlined } from "@ant-design/icons";
import { TranslationId } from "@shared/const/translation";
import cls from "./PackCrumb.module.scss";

const { Text } = Typography;

export const PackCrumb: FC = memo(() => {
    const { t } = useTranslation(TranslationId.PACK);

    return (
        <Breadcrumb
            items={[
                {
                    title: (
                        <Text keyboard>
                            <AppstoreOutlined className={cls.icon} />
                            {t("packPage")}
                        </Text>
                    ),
                },
            ]}
        />
    );
});

PackCrumb.displayName = "PackCrumb";
