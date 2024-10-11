import { FC } from "react";
import classNames from "classnames";
import cls from "./Title.module.scss";

interface TitleProps {
    text: string;
    align?: "left" | "center" | "right";
    marginBottom?: "none" | "small" | "middle" | "large";
    fontSize?: "m" | "l" | "xl";
}

export const Title: FC<TitleProps> = (props) => {
    const { text, align = "left", marginBottom = "middle", fontSize = "l" } = props;

    return (
        <p
            className={classNames(
                cls.Title,
                cls[`align-${align}`],
                cls[`margin-bottom-${marginBottom}`],
                cls[`font-${fontSize}`],
            )}
        >
            {text}
        </p>
    );
};
