import { FC } from "react";
import cls from "./Loader.module.scss";

interface LoaderProps {
    className?: string;
}

export const Loader: FC<LoaderProps> = () => (
    <div className={cls["lds-ellipsis"]}>
        <div />
        <div />
        <div />
        <div />
    </div>
);
