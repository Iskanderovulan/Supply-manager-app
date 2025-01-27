import { baseApi } from "@shared/api/rtkApi";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { ColorSchema } from "../model/types/colorSchema";

export const createColorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createColor: builder.mutation<ColorSchema, Partial<ColorSchema>>({
            query: (newColor) => ({
                url: API_ENDPOINTS.COLORS,
                method: "POST",
                body: newColor,
            }),
            invalidatesTags: [{ type: TagTypes.COLORS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useCreateColorMutation } = createColorApi;
