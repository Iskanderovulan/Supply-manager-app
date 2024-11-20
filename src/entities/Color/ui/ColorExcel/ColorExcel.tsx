import { FC } from "react";
import { ExcelGenerator } from "@entities/CommonControl";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { ExcelConfigType } from "@entities/Color/model/config/excelColorConfig";
import { ColorSchema } from "@entities/Color/model/types/colorSchema";
import { excelColorConfig } from "@entities/Color/model/config/excelColorConfig";

interface ColorExcelProps {
    results: ColorSchema[];
}

export const ColorExcel: FC<ColorExcelProps> = ({ results }) => {
    const { t } = useTranslation(TranslationId.COLOR);

    return (
        <ExcelGenerator<ColorSchema, ExcelConfigType>
            data={results}
            t={t}
            fileName="Colors"
            excelConfig={excelColorConfig}
        />
    );
};
