import { FC } from "react";
import { Table, Progress, Divider } from "antd";
import { Category, Stats } from "@entities/Chart/model/chartSchema";
import { TFunction } from "i18next";

interface ChartAnalysisProps {
    stats: Stats;
    categories: Category[];
    t: TFunction;
}

export const ChartAnalysis: FC<ChartAnalysisProps> = (props) => {
    const { stats, categories, t } = props;
    const columns = [
        { title: t("category"), dataIndex: "category", key: "category", width: "20%" },
        {
            title: t("percentage"),
            key: "percentage",
            render: (_: unknown, record: { count: number }) => (
                <Progress percent={Math.round((record.count / stats.total) * 100)} size="small" />
            ),
            width: "80%",
        },
    ];

    return (
        <>
            <Divider>{t("productAnalysis")}</Divider>
            <Table dataSource={categories} columns={columns} pagination={false} rowKey="category" />
        </>
    );
};
