// Button.tsx
import React from "react";
import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

interface CustomButtonProps extends AntdButtonProps {
    className?: string;
    theme?: "primary" | "secondary" | "accent" | "error" | "clear";
}

export const Button: React.FC<CustomButtonProps> = (props) => {
    const { className = "", children, theme = "primary", ...otherProps } = props;

    const mods: Record<string, boolean | string> = {
        [cls.primary]: theme === "primary",
        [cls.secondary]: theme === "secondary",
        [cls.accent]: theme === "accent",
        [cls.error]: theme === "error",
        [cls.clear]: theme === "clear",
    };

    return (
        <AntdButton className={classNames(cls.Button, mods, [className])} {...otherProps}>
            {children}
        </AntdButton>
    );
};
