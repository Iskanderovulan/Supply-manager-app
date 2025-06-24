import { FC, useMemo } from "react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { generateColumns } from "@shared/lib/helpers/generateColumns/generateColumns";
import { generateDate } from "@shared/lib/helpers/generateDate/generateDate";
import { TableComponent } from "@shared/ui/TableComponent";
import { TranslationId } from "@shared/const/translation";
import { ColumnManager } from "@features/columnManager";
import { useColumns } from "@shared/lib/hooks/useColumns";
import { ErrorMessage } from "@shared/ui/ErrorMessage";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector";
import { RowDensity, selectSpacing } from "@features/rowDensity";
import { ProductSchema } from "@entities/product";
import { ProductClassificatorsSchema } from "@widgets/Product/model/ProductClassificatorsSchema";
import { ProductNavigate } from "../ProductNavigate/ProductNavigate";
import { ProductEdit } from "../ProductEdit/ProductEdit";
import { ProductDelete } from "../ProductDelete/ProductDelete";

interface ProductsTableProps extends ProductClassificatorsSchema {
    dataSource: ProductSchema[];
    isFetching: boolean;
    error: unknown;
}

export const ProductTable: FC<ProductsTableProps> = (props) => {
    const { dataSource, isFetching, error, materialOptions, colorOptions, packOptions } = props;
    const { t } = useTranslation(TranslationId.PRODUCT);
    const rowSpacing = useAppSelector(selectSpacing);
    const allColumns = useMemo(
        () =>
            generateColumns<ProductSchema>([
                {
                    title: t("name"),
                    key: "name",
                    render: (_, record) => <span>{record.name}</span>,
                },

                {
                    title: t("price"),
                    key: "price",
                    render: (_, record) => <span>{record.price.toFixed(2)}</span>,
                },
                {
                    title: t("material"),
                    key: "material",
                    render: (_, record) => (
                        <span>{record.material?.name || t("notSpecified")}</span>
                    ),
                },
                {
                    title: t("color"),
                    key: "color",
                    render: (_, record) => <span>{record.color?.name || t("notSpecified")}</span>,
                },
                {
                    title: t("pack"),
                    key: "pack",
                    render: (_, record) => <span>{record.pack?.name || t("notSpecified")}</span>,
                },
                {
                    title: t("createdAt"),
                    key: "createdAt",
                    render: (_, record) => <span>{generateDate(record.createdAt)}</span>,
                },
                {
                    title: t("updatedAt"),
                    key: "updatedAt",
                    render: (_, record) => <span>{generateDate(record.updatedAt)}</span>,
                },
                {
                    title: t("actions"),
                    key: "actions",
                    render: (_, record) => (
                        <Flex gap="middle">
                            <ProductEdit
                                product={record}
                                materialOptions={materialOptions}
                                colorOptions={colorOptions}
                                packOptions={packOptions}
                            />
                            <ProductDelete product={record} />
                            <ProductNavigate productId={record.id} />
                        </Flex>
                    ),
                },
            ]),
        [t, materialOptions, colorOptions, packOptions],
    );

    const { columnsConfig, visibleColumns, setVisibleColumns, filteredColumns } = useColumns(
        allColumns,
        "productsTable",
    );

    const expandedRowRender = (record: ProductSchema) => (
        <div>
            <p>
                {t("id")}: {record.id}
            </p>
            <p>
                {t("description")}: {record.description}
            </p>
        </div>
    );

    const showExpandIcon = visibleColumns.includes("actions");

    if (error) {
        return <ErrorMessage error={error} />;
    }

    return (
        <>
            <TableComponent<ProductSchema>
                columns={filteredColumns}
                rowSpacing={rowSpacing}
                dataSource={dataSource}
                loading={isFetching}
                rowKey="id"
                data-testid="product-table"
                expandable={{
                    expandedRowRender,
                    expandIcon: showExpandIcon ? undefined : () => null,
                    rowExpandable: (record) => !!record.id,
                }}
            />
            <Flex gap="small">
                <ColumnManager
                    columnsConfig={columnsConfig}
                    visibleColumns={visibleColumns}
                    onVisibleColumnsChange={setVisibleColumns}
                />
                <RowDensity />
            </Flex>
        </>
    );
};
