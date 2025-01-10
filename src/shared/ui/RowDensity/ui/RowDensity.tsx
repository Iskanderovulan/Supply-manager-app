import { FC, memo } from "react";
import { Dropdown, Button, Space } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector";
import { spacingActions } from "../model/slice/spacingSlice";
import { spacingOptions } from "../model/const/spacingOptions";
import { selectSpacing } from "../model/selector/spacingSelectors";
import { useTranslation } from "react-i18next";
import type { MenuProps } from "antd";
import classNames from "classnames";
import cls from "./RowDensity.module.scss";

export const RowDensity: FC = memo(() => {
    const dispatch = useAppDispatch();
    const spacing = useAppSelector(selectSpacing);
    const { t: global } = useTranslation();

    const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
        const newSpacing = parseInt(key);
        dispatch(spacingActions.setSpacing(newSpacing));
    };

    const items: MenuProps["items"] = spacingOptions.map((option) => ({
        key: option.key,
        label: (
            <span
                className={classNames(cls.textColor, {
                    [cls.highlighted]: spacing === parseInt(option.key),
                })}
            >
                {global(option.label)}
            </span>
        ),
    }));

    return (
        <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
            <Button icon={<BarsOutlined />} className={classNames(cls.outlinedBtn)}>
                <Space>
                    {global("rowDensity")}
                    <BarsOutlined />
                </Space>
            </Button>
        </Dropdown>
    );
});

RowDensity.displayName = "RowDensity";
