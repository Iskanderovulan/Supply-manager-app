import { useEffect } from "react";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch";
import { baseApi } from "@shared/api/rtkApi";
import { authActions } from "@entities/auth";

interface UseLogoutEffectProps {
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
}

export const useLogoutEffect = ({ isSuccess, isError, reset }: UseLogoutEffectProps): void => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isSuccess) {
            dispatch(baseApi.util.resetApiState());
            dispatch(authActions.clearToken());
        }

        if (isError) {
            reset();
        }
    }, [isSuccess, isError, reset, dispatch]);
};
