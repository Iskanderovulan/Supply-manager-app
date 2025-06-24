import { MaterialSchema } from "@entities/material/model/types/materialSchema";
import { ColorSchema } from "@entities/color/model/types/colorSchema";
import { PackSchema } from "@entities/pack/model/types/packSchema";
import { CommonSchema } from "@shared/ui/CommonControl";

export interface ProductSchema extends CommonSchema {
    description: string;
    price: number;
    material: MaterialSchema | null;
    color: ColorSchema | null;
    pack: PackSchema | null;
}
