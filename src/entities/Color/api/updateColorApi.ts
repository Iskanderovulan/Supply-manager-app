import { baseApi } from "@shared/api/rtkApi";
import { ColorSchema } from "../model/types/colorSchema";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";

export const updateColorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateColor: builder.mutation<ColorSchema, Partial<ColorSchema>>({
            query: ({ id, ...patch }) => ({
                url: `${API_ENDPOINTS.COLORS}/${id}`,
                method: "PATCH",
                body: patch,
            }),
            invalidatesTags: (result, _, { id }) =>
                result
                    ? [{ type: TagTypes.COLORS, id }]
                    : [{ type: TagTypes.COLORS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useUpdateColorMutation } = updateColorApi;
