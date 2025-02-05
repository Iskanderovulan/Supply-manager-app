import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ExcelGenerator } from "@shared/ui/CommonControl";
import { TranslationId } from "@shared/const/translation";
import { ExcelConfigType, excelPackConfig } from "@entities/Pack/config/excelPackConfig";
import { PackSchema } from "@entities/Pack/model/types/packSchema";

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
