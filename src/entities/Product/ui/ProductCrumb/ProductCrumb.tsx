import { FC, memo } from "react";
import { Breadcrumb } from "antd";
import { useTranslation } from "react-i18next";
import { PieChartOutlined } from "@ant-design/icons";
import { TranslationId } from "@shared/const/translation";
import { CrumbItem } from "@shared/ui/CrumbItem/CrumbItem";

export const ProductCrumb: FC = memo(() => {
    const { t } = useTranslation(TranslationId.PRODUCT);
    return (
        <Breadcrumb
            items={[
                {
                    title: <CrumbItem icon={<PieChartOutlined />} text={t("productPage")} />,
                },
            ]}
        />
    );
});

ProductCrumb.displayName = "ProductCrumb";
