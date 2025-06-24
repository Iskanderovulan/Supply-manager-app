import { FC } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "antd";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { Loader } from "@shared/ui/Loader";
import { ErrorMessage } from "@shared/ui/ErrorMessage";
import { useGetDetailsQuery } from "@entities/product";
import { DetailsInfo } from "./DetailsInfo/DetailsInfo";
import { DetailsCrumb } from "./DetailsCrumb/DetailsCrumb";

export const Details: FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data: product, isLoading, error } = useGetDetailsQuery(id || "");

    const { t } = useTranslation(TranslationId.NOTIFICATION);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorMessage error={error} />;
    }

    if (!product) {
        return <Alert message={t("notFound")} type="warning" />;
    }

    return (
        <>
            <DetailsCrumb />
            <DetailsInfo product={product} />
        </>
    );
};
