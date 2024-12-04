import { useMemo } from "react";
import { useGetMaterialsQuery } from "@entities/Material/api";
import { useGetColorsQuery } from "@entities/Color/api";
import { useGetPacksQuery } from "@entities/Pack/api";
import { createOptions } from "@entities/Product/lib/helpers/createOptions";

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
