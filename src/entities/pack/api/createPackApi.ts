import { baseApi } from "@shared/api/rtkApi";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { PackSchema } from "../model/types/packSchema";

export const createPackApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPack: builder.mutation<PackSchema, Partial<PackSchema>>({
            query: (newPack) => ({
                url: API_ENDPOINTS.PACKS,
                method: "POST",
                body: newPack,
            }),
            invalidatesTags: [{ type: TagTypes.PACKS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useCreatePackMutation } = createPackApi;
