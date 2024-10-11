import { FC } from "react";
import { ItemsPerPage } from "@shared/ui/ItemsPerPage";
import { UpdateSearchParamsFunc } from "@shared/lib/hooks/useFilterSearchParams";
import { getUpdatedValue } from "@shared/lib/helpers/getUpdatedValue";
import { defaultPageSizeOption } from "@shared/const/pageSizeOptions";

interface MaterialPerPageProps {
    limit: number;
    updateSearchParams: UpdateSearchParamsFunc;
}

export const MaterialPerPage: FC<MaterialPerPageProps> = (props) => {
    const { updateSearchParams, ...rest } = props;

    const onLimitChange = (newLimit: number) => {
        updateSearchParams({
            page: null,
            limit: getUpdatedValue(newLimit, defaultPageSizeOption),
        });
    };

    return <ItemsPerPage onLimitChange={onLimitChange} {...rest} />;
};
