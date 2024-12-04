import { ProductSchema } from "./ProductSchema";
import { CommonResponse } from "@entities/CommonControl";

export type ProductResponse = CommonResponse<ProductSchema[]>;
