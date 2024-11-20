import { FC } from "react";
import { ExcelGenerator } from "@entities/CommonControl";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { ExcelConfigType } from "@entities/Material/model/config/excelMaterialConfig";
import { MaterialSchema } from "@entities/Material/model/types/materialSchema";
import { excelMaterialConfig } from "@entities/Material/model/config/excelMaterialConfig";

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
