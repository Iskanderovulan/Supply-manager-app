import { FC, memo } from "react";
import { Breadcrumb, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { AlertOutlined } from "@ant-design/icons";
import { TranslationId } from "@shared/const/translation";
import cls from "./ColorCrumb.module.scss";

const { Text } = Typography;

export const ColorCrumb: FC = memo(() => {
    const { t } = useTranslation(TranslationId.COLOR);

    return (
        <Breadcrumb
            items={[
                {
                    title: (
                        <Text keyboard>
                            <AlertOutlined className={cls.icon} />
                            {t("colorPage")}
                        </Text>
                    ),
                },
            ]}
        />
    );
});

ColorCrumb.displayName = "ColorCrumb";
