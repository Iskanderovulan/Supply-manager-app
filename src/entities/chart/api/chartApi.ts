import { baseApi } from "@shared/api/rtkApi";
import type { ChartSchema } from "../model/chartSchema";

export const chartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStatistics: builder.query<ChartSchema, void>({
            query: () => "statistics",
        }),
    }),
});

export const { useGetStatisticsQuery } = chartApi;
