import { FC, useCallback } from "react";
import { ItemsPerPage } from "@shared/ui/ItemsPerPage";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { getUpdatedValue } from "@shared/lib/helpers/getUpdatedValue";
import { defaultPageSizeOption } from "@shared/const/pageSizeOptions";

interface MaterialPerPageProps {
    limit: number;
    updateSearchParams: UpdateSearchParamsType;
}

export const MaterialPerPage: FC<MaterialPerPageProps> = (props) => {
    const { updateSearchParams, ...rest } = props;

    const onLimitChange = useCallback(
        (newLimit: number) => {
            updateSearchParams({
                page: null,
                limit: getUpdatedValue(newLimit, defaultPageSizeOption),
            });
        },
        [updateSearchParams],
    );

    return <ItemsPerPage onLimitChange={onLimitChange} {...rest} />;
};
