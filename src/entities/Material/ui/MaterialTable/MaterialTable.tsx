import { FC, useMemo } from "react";
import { MaterialSchema } from "@entities/Material/model/types/materialSchema";
import { generateColumns } from "@shared/lib/helpers/generateColumns/generateColumns";
import { hardnessOptions } from "@entities/Material/model/const/hardnessOptions";
import { generateDate } from "@shared/lib/helpers/generateDate/generateDate";
import { TableComponent } from "@shared/ui/TableComponent";
import { MaterialEdit } from "../MaterialEdit/MaterialEdit";
import { MaterialDelete } from "../MaterialDelete/MaterialDelete";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { Flex } from "antd";
import { ColumnManager } from "@shared/ui/ColumnManager";
import { useColumns } from "@shared/lib/hooks/useColumns";
import { Loader } from "@shared/ui/Loader";
import { ErrorMessage } from "@shared/ui/ErrorMessage";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector";
import { RowDensity, selectSpacing } from "@shared/ui/RowDensity";

interface MaterialsTableProps {
    dataSource: MaterialSchema[];
    isLoading: boolean;
    error: unknown;
}

export const MaterialsTable: FC<MaterialsTableProps> = (props) => {
    const { dataSource, isLoading, error } = props;
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

    if (isLoading) {
        return <Loader />;
    }
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
