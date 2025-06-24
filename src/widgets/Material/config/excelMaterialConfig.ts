import { TFunction } from "i18next";
import { generateDate } from "@shared/lib/helpers/generateDate/generateDate";
import { MaterialSchema } from "@entities/material";
import { hardnessOptions } from "../const/hardnessOptions";

export const excelMaterialConfig = (item: MaterialSchema, t: TFunction, lang: string) => {
    const hardnessLabel = hardnessOptions.find(
        (option) => option.value === String(item.hardness),
    )?.label;

    return {
        [t("id", { lng: lang })]: item.id,
        [t("name", { lng: lang })]: item.name,
        [t("hardness", { lng: lang })]: hardnessLabel ? t(hardnessLabel, { lng: lang }) : "",
        [t("createdAt", { lng: lang })]: generateDate(item.createdAt),
        [t("updatedAt", { lng: lang })]: generateDate(item.updatedAt),
    };
};

export type ExcelConfigType = ReturnType<typeof excelMaterialConfig>;
