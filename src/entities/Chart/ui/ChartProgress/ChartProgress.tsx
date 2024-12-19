import { FC } from "react";
import { Row, Col, Card, Space, Progress, Typography, Statistic, Divider } from "antd";
import { TFunction } from "i18next";
import type { Category, Stats } from "@entities/Chart/model/chartSchema";
import cls from "./ChartProgress.module.scss";

const { Text } = Typography;

interface ChartAnalysisProps {
    stats: Stats;
    categories: Category[];
    t: TFunction;
}

export const ChartProgress: FC<ChartAnalysisProps> = (props) => {
    const { stats, categories, t } = props;

    return (
        <>
            <Divider>{t("categoryDistribution")}</Divider>
            <Row gutter={[16, 16]} justify="center">
                {categories.map((item) => (
                    <Col span={8} key={item.category}>
                        <Card bordered={false}>
                            <Space direction="vertical" align="center" className={cls.progressWrap}>
                                <Progress
                                    type="circle"
                                    percent={Math.round((item.count / stats.total) * 100)}
                                />
                                <Text>{t(item.category.toLowerCase())}</Text>
                                <Statistic value={item.count} suffix={` / ${stats.total}`} />
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};
