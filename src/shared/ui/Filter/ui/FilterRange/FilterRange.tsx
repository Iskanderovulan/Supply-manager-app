import { FC } from "react";
import { Slider, Button, Flex } from "antd";
import cls from "./FilterRange.module.scss";
import { TFunction } from "i18next";

interface FilterRangeProps {
    selectedValue: [number, number] | null;
    onChange: (value: [number, number] | null) => void;
    t: TFunction;
    min: number;
    max: number;
}

export const FilterRange: FC<FilterRangeProps> = (props) => {
    const { selectedValue, onChange, t, min, max } = props;

    const handleRangeChange = (value: number[]) => {
        // Проверяем, что значение корректное и передаем его как [number, number]
        if (value.length === 2) {
            onChange([value[0], value[1]]);
        }
    };

    const handleReset = () => {
        onChange(null);
    };

    return (
        <>
            <Slider
                range
                min={min}
                max={max}
                value={selectedValue || [min, max]}
                onChange={handleRangeChange}
                className={cls.slider}
            />
            <Flex justify="end" gap="small">
                <Button type="dashed" size="small" onClick={handleReset}>
                    {t("reset")}
                </Button>
            </Flex>
        </>
    );
};
