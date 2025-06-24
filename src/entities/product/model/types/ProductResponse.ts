import { ProductSchema } from "./ProductSchema";
import { CommonResponse } from "@shared/ui/CommonControl";

export type ProductResponse = CommonResponse<ProductSchema[]>;
