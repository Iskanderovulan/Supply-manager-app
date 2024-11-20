import { FC, memo } from "react";
import { Breadcrumb, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { InboxOutlined } from "@ant-design/icons";
import { TranslationId } from "@shared/const/translation";
import cls from "./ProductCrumb.module.scss";

const { Text } = Typography;

export const ProductCrumb: FC = memo(() => {
  const { t } = useTranslation(TranslationId.PRODUCT);

  return (
    <Breadcrumb
      items={[
        {
          title: (
            <Text keyboard>
              <InboxOutlined className={cls.icon} />
              {t("productPage")}
            </Text>
          ),
        },
      ]}
    />
  );
});

ProductCrumb.displayName = "ProductCrumb";
