import { useTranslation } from "react-i18next";
import { Button, Typography, Flex } from "antd";
import cls from "./ErrorScreen.module.scss";

const { Text } = Typography;

export const ErrorScreen = () => {
    const { t: global } = useTranslation();
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <Flex align="center" justify="center" vertical className={cls.ErrorScreen}>
            <Text>{global("errorScreenText")}</Text>
            <Button onClick={reloadPage}>{global("errorScreenBtn")}</Button>
        </Flex>
    );
};
