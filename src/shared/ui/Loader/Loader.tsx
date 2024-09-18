import { FC } from "react";
import classNames from "classnames";
import cls from "./Loader.module.scss";

interface LoaderProps {
    className?: string;
}

export const Loader: FC<LoaderProps> = ({ className = "" }) => (
    <div className={classNames(cls["lds-ellipsis"], className)}>
        <div />
        <div />
        <div />
        <div />
    </div>
);
