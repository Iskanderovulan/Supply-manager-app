import { ColorSchema } from "../types/colorSchema";
import { TFunction } from "i18next";
import { intensityOptions } from "../const/intensityOptions";
import { generateDate } from "@shared/lib/helpers/generateDate/generateDate";

export const excelColorConfig = (item: ColorSchema, t: TFunction, lang: string) => {
    const intensityLabel = intensityOptions.find((option) => option.value === item.intensity)?.label;

    return {
        [t("id", { lng: lang })]: item.id,
        [t("name", { lng: lang })]: item.name,
        [t("intensity", { lng: lang })]: intensityLabel ? t(intensityLabel, { lng: lang }) : "",
        [t("createdAt", { lng: lang })]: generateDate(item.createdAt),
        [t("updatedAt", { lng: lang })]: generateDate(item.updatedAt),
    };
};

export type ExcelConfigType = ReturnType<typeof excelColorConfig>;
