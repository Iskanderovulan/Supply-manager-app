// src/components/ProductExcel/ProductExcel.tsx

import { FC } from "react";
import { ExcelGenerator } from "@entities/CommonControl";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { ExcelConfigType } from "@entities/Product/model/config/excelProductConfig";
import { ProductSchema } from "@entities/Product/model/types/ProductSchema";
import { excelProductConfig } from "@entities/Product/model/config/excelProductConfig";

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
