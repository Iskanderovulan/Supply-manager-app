import { FC, useMemo } from "react";
import { MaterialSchema } from "@entities/Material/model/types/materialSchema";
import { generateColumns } from "@shared/lib/helpers/fixedColumnsHeader";
import { hardnessOptions } from "@entities/Material/model/const/hardnessOptions";
import { generateDate } from "@shared/lib/helpers/generateDate";
import { TableComponent } from "@shared/ui/TableComponent";
import { EditMaterial } from "../EditMaterial/EditMaterial";
import { DeleteMaterial } from "../DeleteMaterial/DeleteMaterial";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { Flex } from "antd";
import { ColumnManager } from "@shared/ui/ColumnManager";
import { useColumns } from "@shared/lib/hooks/useColumns/useColumns";

interface MaterialsTableProps {
    dataSource: MaterialSchema[];
    isLoading: boolean;
    error: unknown;
}

export const MaterialsTable: FC<MaterialsTableProps> = ({ dataSource, isLoading, error }) => {
    const { t } = useTranslation(TranslationId.MATERIAL);

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
                                hardnessOptions.find((el) => el.value === record.hardness)?.label ||
                                    "",
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
                            <EditMaterial material={record} />
                            <DeleteMaterial material={record} />
                        </Flex>
                    ),
                },
            ]),
        [t],
    );

    const { columnsConfig, visibleColumns, setVisibleColumns, filteredColumns } =
        useColumns(allColumns);

    const expandedRowRender = (record: MaterialSchema) => (
        <span>
            {t("id")}: {record.id}
        </span>
    );

    const showExpandIcon = visibleColumns.includes("actions");

    return (
        <>
            <TableComponent<MaterialSchema>
                columns={filteredColumns}
                dataSource={dataSource}
                isLoading={isLoading}
                error={error}
                rowKey="id"
                expandable={{
                    expandedRowRender,
                    expandIcon: showExpandIcon ? undefined : () => null,
                    rowExpandable: (record) => !!record.id,
                }}
            />
            <ColumnManager
                columnsConfig={columnsConfig}
                visibleColumns={visibleColumns}
                onVisibleColumnsChange={setVisibleColumns}
            />
        </>
    );
};
