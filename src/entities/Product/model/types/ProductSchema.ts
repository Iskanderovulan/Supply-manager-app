import { MaterialSchema } from "@entities/Material/model/types/materialSchema";
import { ColorSchema } from "@entities/Color/model/types/colorSchema";
import { PackSchema } from "@entities/Pack/model/types/packSchema";
import { CommonSchema } from "@shared/ui/CommonControl";

export interface ProductSchema extends CommonSchema {
    description: string;
    price: number;
    material: MaterialSchema | null;
    color: ColorSchema | null;
    pack: PackSchema | null;
}
