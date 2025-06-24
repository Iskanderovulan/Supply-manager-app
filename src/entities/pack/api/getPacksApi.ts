import { baseApi } from "@shared/api/rtkApi";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { GetCommonParams } from "@shared/ui/CommonControl";
import { PackResponse } from "../model/types/packResponse";

interface GetPacksParams extends GetCommonParams {
    type?: string[];
}

const getPackQueryConfig = ({
    page,
    limit,
    name,
    type,
    sortBy,
    paginated = true,
}: GetPacksParams) => {
    const config: Record<string, { condition: boolean; value: string | undefined }> = {
        name: { condition: !!name, value: name },
        type: { condition: (type || []).length > 0, value: type?.join(",") },
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

    return { url: API_ENDPOINTS.PACKS, params };
};

export const getPacksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPacks: builder.query<PackResponse, GetPacksParams>({
            query: getPackQueryConfig,
            providesTags: (result) =>
                result?.results
                    ? [
                          ...result.results.map(({ id }) => ({
                              type: TagTypes.PACKS as const,
                              id,
                          })),
                          { type: TagTypes.PACKS, id: TagTypes.LIST },
                      ]
                    : [{ type: TagTypes.PACKS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useGetPacksQuery } = getPacksApi;
