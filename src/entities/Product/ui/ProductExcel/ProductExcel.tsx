import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ExcelGenerator } from "@shared/ui/CommonControl";
import { TranslationId } from "@shared/const/translation";
import { ExcelConfigType, excelProductConfig } from "@entities/Product/config/excelProductConfig";
import { ProductSchema } from "@entities/Product/model/types/ProductSchema";

interface ProductExcelProps {
    results: ProductSchema[];
}

export const ProductExcel: FC<ProductExcelProps> = ({ results }) => {
    const { t } = useTranslation(TranslationId.PRODUCT);

    return (
        <ExcelGenerator<ProductSchema, ExcelConfigType>
            data={results}
            t={t}
            fileName="Products"
            excelConfig={excelProductConfig}
        />
    );
};
