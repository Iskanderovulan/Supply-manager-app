import { FC } from "react";
import { Button, ButtonProps } from "antd";
import cls from "./FormButtons.module.scss";

interface FormButtonsProps {
    buttons: {
        label: string;
        type: string;
        htmlType: string;
        className?: string;
        onClick?: string;
    }[];
    loading?: boolean;
    handleButtonClick: (handlerKey?: string) => void;
}

export const FormButtons: FC<FormButtonsProps> = (props) => {
    const { buttons, loading, handleButtonClick } = props;
    return (
        <div className={cls.ButtonWrap}>
            {buttons.map((button, index) => (
                <Button
                    key={index}
                    type={button.type as ButtonProps["type"]}
                    htmlType={button.htmlType as ButtonProps["htmlType"]}
                    loading={loading}
                    className={button.className}
                    onClick={() => handleButtonClick(button.onClick)}
                >
                    {button.label}
                </Button>
            ))}
        </div>
    );
};
