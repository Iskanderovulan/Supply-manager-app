import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ExcelGenerator } from "@shared/ui/CommonControl";
import { TranslationId } from "@shared/const/translation";
import {
    ExcelConfigType,
    excelMaterialConfig,
} from "@entities/Material/config/excelMaterialConfig";
import { MaterialSchema } from "@entities/Material/model/types/materialSchema";

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
