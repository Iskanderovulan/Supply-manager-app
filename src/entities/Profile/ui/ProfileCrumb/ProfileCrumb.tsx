import { FC, memo } from "react";
import { Breadcrumb, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UserOutlined } from "@ant-design/icons";
import { TranslationId } from "@shared/const/translation";
import cls from "./ProfileCrumb.module.scss";

const { Text } = Typography;

export const ProfileCrumb: FC = memo(() => {
    const { t } = useTranslation(TranslationId.PROFILE);

    return (
        <Breadcrumb
            items={[
                {
                    title: (
                        <Text keyboard>
                            <UserOutlined className={cls.icon} />
                            {t("profilePage")}
                        </Text>
                    ),
                },
            ]}
        />
    );
});

ProfileCrumb.displayName = "ProfileCrumb";
