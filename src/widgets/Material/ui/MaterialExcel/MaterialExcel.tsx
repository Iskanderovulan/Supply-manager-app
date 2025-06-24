import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ExcelGenerator } from "@shared/ui/CommonControl";
import { TranslationId } from "@shared/const/translation";
import {
    ExcelConfigType,
    excelMaterialConfig,
} from "@widgets/Material/config/excelMaterialConfig.ts";

import { MaterialSchema } from "@entities/material";

interface MaterialExcelProps {
    results: MaterialSchema[];
}

export const MaterialExcel: FC<MaterialExcelProps> = ({ results }) => {
    const { t } = useTranslation(TranslationId.MATERIAL);

    return (
        <ExcelGenerator<MaterialSchema, ExcelConfigType>
            data={results}
            t={t}
            fileName="Materials"
            excelConfig={excelMaterialConfig}
        />
    );
};
