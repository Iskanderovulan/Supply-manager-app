import { FC } from "react";
import { ExcelGenerator } from "@shared/ui/CommonControl";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { ExcelConfigType } from "@entities/Pack/model/config/excelPackConfig";
import { PackSchema } from "@entities/Pack/model/types/packSchema";
import { excelPackConfig } from "@entities/Pack/model/config/excelPackConfig";

interface PackExcelProps {
    results: PackSchema[];
}

export const PackExcel: FC<PackExcelProps> = ({ results }) => {
    const { t } = useTranslation(TranslationId.PACK);

    return (
        <ExcelGenerator<PackSchema, ExcelConfigType>
            data={results}
            t={t}
            fileName="Packs"
            excelConfig={excelPackConfig}
        />
    );
};
