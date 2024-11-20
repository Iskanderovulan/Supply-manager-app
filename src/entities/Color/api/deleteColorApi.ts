import { baseApi } from "@shared/api/rtkApi";
import { ColorSchema } from "../model/types/colorSchema";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";

export const deleteColorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteColor: builder.mutation<ColorSchema, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.COLORS}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) =>
                result
                    ? [{ type: TagTypes.COLORS, id }]
                    : error
                    ? [{ type: TagTypes.COLORS, id: TagTypes.LIST }]
                    : [{ type: TagTypes.COLORS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useDeleteColorMutation } = deleteColorApi;
