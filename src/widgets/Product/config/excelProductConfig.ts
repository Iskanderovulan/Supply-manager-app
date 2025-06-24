import { TFunction } from "i18next";
import { generateDate } from "@shared/lib/helpers/generateDate/generateDate";
import { ProductSchema } from "@entities/product";

export const excelProductConfig = (item: ProductSchema, t: TFunction, lang: string) => ({
    [t("id", { lng: lang })]: item.id,
    [t("name", { lng: lang })]: item.name,
    [t("description", { lng: lang })]: item.description,
    [t("price", { lng: lang })]: item.price.toFixed(2),
    [t("material", { lng: lang })]: item.material?.name || t("notSpecified", { lng: lang }),
    [t("color", { lng: lang })]: item.color?.name || t("notSpecified", { lng: lang }),
    [t("pack", { lng: lang })]: item.pack?.name || t("notSpecified", { lng: lang }),
    [t("createdAt", { lng: lang })]: generateDate(item.createdAt),
    [t("updatedAt", { lng: lang })]: generateDate(item.updatedAt),
});

export type ExcelConfigType = ReturnType<typeof excelProductConfig>;
