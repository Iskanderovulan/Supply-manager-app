import { baseApi } from "@shared/api/rtkApi";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { GetCommonParams } from "@shared/ui/CommonControl";
import { ColorResponse } from "../model/types/colorResponse";

interface GetColorsParams extends GetCommonParams {
    intensity?: string[];
}

const getColorQueryConfig = ({
    page,
    limit,
    name,
    intensity,
    sortBy,
    paginated = true,
}: GetColorsParams) => {
    const config: Record<string, { condition: boolean; value: string | undefined }> = {
        name: { condition: !!name, value: name },
        intensity: { condition: (intensity || []).length > 0, value: intensity?.join(",") },
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

    return { url: API_ENDPOINTS.COLORS, params };
};

export const getColorsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getColors: builder.query<ColorResponse, GetColorsParams>({
            query: getColorQueryConfig,
            providesTags: (result) =>
                result?.results
                    ? [
                          ...result.results.map(({ id }) => ({
                              type: TagTypes.COLORS as const,
                              id,
                          })),
                          { type: TagTypes.COLORS, id: TagTypes.LIST },
                      ]
                    : [{ type: TagTypes.COLORS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useGetColorsQuery } = getColorsApi;
