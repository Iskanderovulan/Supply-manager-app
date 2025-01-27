import { baseApi } from "@shared/api/rtkApi";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { ColorSchema } from "../model/types/colorSchema";

export const deleteColorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteColor: builder.mutation<ColorSchema, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.COLORS}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: TagTypes.COLORS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useDeleteColorMutation } = deleteColorApi;
