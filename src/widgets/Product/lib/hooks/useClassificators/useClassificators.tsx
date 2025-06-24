import { useMemo } from "react";
import { useGetMaterialsQuery } from "@entities/material/api";
import { useGetColorsQuery } from "@entities/color/api";
import { useGetPacksQuery } from "@entities/pack/api";
import { createOptions } from "../../helpers/createOptions";

export const useClassificators = () => {
    const {
        data: materials,
        isLoading: isLoadingMaterials,
        error: errorMaterials,
    } = useGetMaterialsQuery({ paginated: false });
    const {
        data: colors,
        isLoading: isLoadingColors,
        error: errorColors,
    } = useGetColorsQuery({ paginated: false });
    const {
        data: packs,
        isLoading: isLoadingPacks,
        error: errorPacks,
    } = useGetPacksQuery({ paginated: false });

    const materialOptions = useMemo(() => createOptions(materials?.results), [materials]);
    const colorOptions = useMemo(() => createOptions(colors?.results), [colors]);
    const packOptions = useMemo(() => createOptions(packs?.results), [packs]);

    return {
        materialOptions,
        colorOptions,
        packOptions,
        isLoading: isLoadingMaterials || isLoadingColors || isLoadingPacks,
        error: errorMaterials || errorColors || errorPacks,
    };
};
