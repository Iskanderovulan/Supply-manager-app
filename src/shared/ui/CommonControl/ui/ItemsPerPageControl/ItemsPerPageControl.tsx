import { FC, memo } from "react";
import { ItemsPerPage } from "@shared/ui/ItemsPerPage";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { getUpdatedValue } from "@shared/lib/helpers/getUpdatedValue/getUpdatedValue";
import { defaultPageSizeOption } from "@shared/const/pageSizeOptions";

export interface ItemsPerPageControlProps {
    limit: number;
    updateSearchParams: UpdateSearchParamsType;
}

export const ItemsPerPageControl: FC<ItemsPerPageControlProps> = memo((props) => {
    const { updateSearchParams, ...rest } = props;

    const onLimitChange = (newLimit: number) => {
        updateSearchParams({
            page: null,
            limit: getUpdatedValue(newLimit, defaultPageSizeOption),
        });
    };

    return <ItemsPerPage onLimitChange={onLimitChange} {...rest} />;
});

ItemsPerPageControl.displayName = "ItemsPerPageControl";
