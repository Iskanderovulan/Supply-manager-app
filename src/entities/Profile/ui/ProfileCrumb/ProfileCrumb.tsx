import { FC, memo } from "react";
import { Breadcrumb, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { CrumbItem } from "@shared/ui/CrumbItem/CrumbItem";

export const ProfileCrumb: FC = memo(() => {
    const { t } = useTranslation(TranslationId.PROFILE);

    return (
        <Flex justify="flex-end">
            <Breadcrumb
                items={[
                    {
                        title: <CrumbItem icon={<UserOutlined />} text={t("profilePage")} />,
                    },
                ]}
            />
        </Flex>
    );
});

ProfileCrumb.displayName = "ProfileCrumb";
