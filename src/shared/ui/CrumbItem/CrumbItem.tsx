import { FC, ReactNode } from "react";
import { Typography } from "antd";
import cls from "./CrumbItem.module.scss";

const { Text } = Typography;

export interface CrumbItemProps {
    icon: ReactNode;
    text: string;
}

export const CrumbItem: FC<CrumbItemProps> = ({ icon, text }) => {
    return (
        <Text keyboard>
            <span className={cls.icon}>{icon}</span>
            {text}
        </Text>
    );
};
