import { MaterialSchema } from "@entities/Material/model/types/materialSchema";
import { ColorSchema } from "@entities/Color/model/types/colorSchema";
import { PackSchema } from "@entities/Pack/model/types/packSchema";

export interface ProductSchema {
    id: string;
    name: string;
    description: string;
    price: number;
    material: MaterialSchema | null;
    color: ColorSchema | null;
    pack: PackSchema | null;
    createdAt: string;
    updatedAt: string;
}
