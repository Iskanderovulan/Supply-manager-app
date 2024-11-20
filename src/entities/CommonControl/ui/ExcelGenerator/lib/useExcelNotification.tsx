import { useState } from "react";

export const useExcelNotification = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const resetNotification = () => {
        setIsSuccess(false);
        setIsError(false);
    };

    return { isSuccess, isError, setIsSuccess, setIsError, resetNotification };
};
