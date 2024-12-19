import { FC, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Divider, Flex } from "antd";
import { useTheme, Theme } from "@app/providers/theme/ThemeProvider";
import cls from "./ChartBar.module.scss";
import { TFunction } from "i18next";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ChartBarProps {
    data: { label: string; value: number }[];
    t: TFunction;
}

export const ChartBar: FC<ChartBarProps> = ({ data, t }) => {
    const { theme } = useTheme();

    const colors = useMemo(() => {
        if (theme === Theme.DARK) {
            return {
                inverseColor: "#ffffff",
                backgroundColors: ["#e60099", "#d0a355", "#8c828b"],
            };
        } else {
            return {
                inverseColor: "#20232a",
                backgroundColors: ["#ffc1cc", "#f7d2c7", "#6d27e8"],
            };
        }
    }, [theme]);

    const chartData = {
        labels: data.map((item) => t(item.label)),
        datasets: [
            {
                label: t("classificators"),
                data: data.map((item) => item.value),
                backgroundColor: colors.backgroundColors,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: colors.inverseColor,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: colors.inverseColor,
                },
                grid: {
                    color: colors.inverseColor,
                },
            },
            y: {
                ticks: {
                    color: colors.inverseColor,
                },
                grid: {
                    color: colors.inverseColor,
                },
            },
        },
    };

    return (
        <div className={cls.chartBar}>
            <Divider>{t("barData")}</Divider>
            <Flex>
                <Bar data={chartData} options={options} />
            </Flex>
        </div>
    );
};
