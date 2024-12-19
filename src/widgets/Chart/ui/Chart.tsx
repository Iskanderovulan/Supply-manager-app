import { FC } from "react";
import { useGetStatisticsQuery } from "@entities/Chart/api";
import { Loader } from "@shared/ui/Loader";
import { ErrorMessage } from "@shared/ui/ErrorMessage";
import { ChartStatistics } from "@entities/Chart";
import { ChartProgress } from "@entities/Chart";
import { ChartAnalysis } from "@entities/Chart";
import { ChartCrumb } from "@entities/Chart";
import { ChartBar } from "@entities/Chart";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";

import type { Stats, Category } from "@entities/Chart/model/chartSchema";

export const Chart: FC = () => {
    const { data, isLoading, error } = useGetStatisticsQuery();
    const { t } = useTranslation(TranslationId.CHART);

    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage error={error} />;

    const { stats, categories } = data as { stats: Stats; categories: Category[] };

    const pieData = categories.map((category) => ({
        label: t(category.category.toLowerCase()),
        value: category.count,
    }));

    return (
        <>
            <ChartCrumb t={t} />
            <ChartStatistics stats={stats} t={t} />
            <ChartProgress stats={stats} categories={categories} t={t} />
            <ChartAnalysis stats={stats} categories={categories} t={t} />
            <ChartBar data={pieData} t={t} />
        </>
    );
};
