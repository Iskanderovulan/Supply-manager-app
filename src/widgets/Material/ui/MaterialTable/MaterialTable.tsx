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
import { MaterialSchema } from "@entities/material";
import { hardnessOptions } from "@widgets/Material/const/hardnessOptions";
import { MaterialEdit } from "../MaterialEdit/MaterialEdit";
import { MaterialDelete } from "../MaterialDelete/MaterialDelete";

interface MaterialsTableProps {
    dataSource: MaterialSchema[];
    isFetching: boolean;
    error: unknown;
}

export const MaterialTable: FC<MaterialsTableProps> = (props) => {
    const { dataSource, isFetching, error } = props;
    const { t } = useTranslation(TranslationId.MATERIAL);
    const rowSpacing = useAppSelector(selectSpacing);

    const allColumns = useMemo(
        () =>
            generateColumns<MaterialSchema>([
                {
                    title: t("name"),
                    dataIndex: "name",
                    key: "name",
                },
                {
                    title: t("hardness"),
                    dataIndex: "hardness",
                    key: "hardness",
                    render: (_, record) => (
                        <span>
                            {t(
                                hardnessOptions.find((el) => el.value === String(record.hardness))
                                    ?.label || "",
                            )}
                        </span>
                    ),
                },
                {
                    title: t("createdAt"),
                    dataIndex: "createdAt",
                    key: "createdAt",
                    render: (date) => <span>{generateDate(date)}</span>,
                },
                {
                    title: t("updatedAt"),
                    dataIndex: "updatedAt",
                    key: "updatedAt",
                    render: (date) => <span>{generateDate(date)}</span>,
                },
                {
                    title: t("actions"),
                    dataIndex: "actions",
                    key: "actions",
                    render: (_, record) => (
                        <Flex gap="middle">
                            <MaterialEdit material={record} />
                            <MaterialDelete material={record} />
                        </Flex>
                    ),
                },
            ]),
        [t],
    );

    const { columnsConfig, visibleColumns, setVisibleColumns, filteredColumns } = useColumns(
        allColumns,
        "materialsTable",
    );

    const expandedRowRender = (record: MaterialSchema) => (
        <span>
            {t("id")}: {record.id}
        </span>
    );

    const showExpandIcon = visibleColumns.includes("actions");

    if (error) {
        return <ErrorMessage error={error} />;
    }

    return (
        <>
            <TableComponent<MaterialSchema>
                columns={filteredColumns}
                rowSpacing={rowSpacing}
                dataSource={dataSource}
                rowKey="id"
                loading={isFetching}
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
