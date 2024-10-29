import { FC, ReactNode } from "react";

interface FormHeaderProps {
    header?: ReactNode;
}

export const FormHeader: FC<FormHeaderProps> = ({ header }) => {
    return header ? <>{header}</> : null;
};
