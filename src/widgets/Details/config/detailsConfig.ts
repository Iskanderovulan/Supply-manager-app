import { generateDate } from "@shared/lib/helpers/generateDate/generateDate";
import { ProductSchema } from "@entities/product";

export const detailsConfig = (product: ProductSchema) => [
    { labelKey: "id", value: product.id },
    { labelKey: "description", value: product.description },
    { labelKey: "price", value: `${product.price} USD` },
    { labelKey: "material", value: product.material?.name || "N/A" },
    { labelKey: "color", value: product.color?.name || "N/A" },
    { labelKey: "pack", value: product.pack?.name || "N/A" },
    { labelKey: "createdAt", value: generateDate(product.createdAt) },
    { labelKey: "updatedAt", value: generateDate(product.updatedAt) },
];
