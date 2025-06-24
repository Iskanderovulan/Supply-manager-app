import { FC } from "react";
import { Row, Col, Card, Statistic, Divider } from "antd";
import { TFunction } from "i18next";
import type { Stats } from "@entities/chart";
import cls from "./ChartStatistics.module.scss";

interface ChartStatisticsProps {
    stats: Stats;
    t: TFunction;
}

export const ChartStatistics: FC<ChartStatisticsProps> = ({ stats, t }) => (
    <>
        <Divider>{t("chartStatistics")}</Divider>
        <Row gutter={[16, 16]} justify="center">
            <Col span={8}>
                <Card className={cls.chartCard}>
                    <Statistic
                        title={t("colorsAvailable")}
                        value={stats.colors}
                        suffix={t("typesSuffix")}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card className={cls.chartCard}>
                    <Statistic
                        title={t("materialsAvailable")}
                        value={stats.materials}
                        suffix={t("typesSuffix")}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card className={cls.chartCard}>
                    <Statistic
                        title={t("packsAvailable")}
                        value={stats.packs}
                        suffix={t("typesSuffix")}
                    />
                </Card>
            </Col>
        </Row>
    </>
);
