import { FC } from "react";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { ExcelGenerator } from "@shared/ui/CommonControl";
import { ExcelConfigType, excelColorConfig } from "@widgets/Color/config/excelColorConfig";
import { ColorSchema } from "@entities/color";

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
