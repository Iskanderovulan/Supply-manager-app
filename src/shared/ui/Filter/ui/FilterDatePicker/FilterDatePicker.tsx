import { FC } from "react";
import { DatePicker, Button, Flex } from "antd";
import { DayjsType } from "../../model/types/valueGroup";
import cls from "./FilterDatePicker.module.scss";
import { TFunction } from "i18next";

interface FilterDatePickerProps {
    selectedValue: DayjsType;
    onChange: (value: DayjsType | null) => void;
    t: TFunction;
}

export const FilterDatePicker: FC<FilterDatePickerProps> = (props) => {
    const { selectedValue, onChange, t } = props;
    const handleDateChange = (dates: DayjsType | null) => {
        onChange(dates || null);
    };
    const handleReset = () => {
        onChange([null, null]);
    };
    return (
        <>
            <DatePicker.RangePicker
                value={selectedValue}
                onChange={handleDateChange}
                placeholder={[t("startDate"), t("endDate")]}
            />
            <Flex className={cls.flex} justify="end" gap="small">
                <Button type="dashed" size="small" onClick={handleReset}>
                    {t("reset")}
                </Button>
            </Flex>
        </>
    );
};
