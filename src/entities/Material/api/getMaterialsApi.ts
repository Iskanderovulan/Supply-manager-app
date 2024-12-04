import { baseApi } from "@shared/api/rtkApi";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { GetCommonParams } from "@entities/CommonControl";
import { MaterialResponse } from "../model/types/materialResponse";

interface GetMaterialsParams extends GetCommonParams {
    hardness?: string[];
}

const getMaterialQueryConfig = ({
    page,
    limit,
    name,
    hardness,
    createdBefore,
    createdAfter,
    sortBy,
    paginated = true,
}: GetMaterialsParams) => {
    const config: Record<string, { condition: boolean; value: string | undefined }> = {
        name: { condition: !!name, value: name },
        hardness: { condition: (hardness || []).length > 0, value: hardness?.join(",") },
        createdBefore: { condition: !!createdBefore, value: createdBefore },
        createdAfter: { condition: !!createdAfter, value: createdAfter },
        sortBy: { condition: !!sortBy, value: sortBy },
        paginated: { condition: !paginated, value: "0" },
    };

    const params: Record<string, unknown> = {};

    if (paginated) {
        params.page = page;
        params.limit = limit;
    }

    Object.keys(config).forEach((key) => {
        if (config[key].condition) {
            params[key] = config[key].value;
        }
    });

    return { url: API_ENDPOINTS.MATERIALS, params };
};

export const getMaterialsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMaterials: builder.query<MaterialResponse, GetMaterialsParams>({
            query: getMaterialQueryConfig,
            providesTags: (result) =>
                result?.results
                    ? [
                          ...result.results.map(({ id }) => ({
                              type: TagTypes.MATERIALS as const,
                              id,
                          })),
                          { type: TagTypes.MATERIALS, id: TagTypes.LIST },
                      ]
                    : [{ type: TagTypes.MATERIALS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useGetMaterialsQuery } = getMaterialsApi;
