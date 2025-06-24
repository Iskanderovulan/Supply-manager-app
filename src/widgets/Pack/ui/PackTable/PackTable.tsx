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
import { PackSchema } from "@entities/pack";
import { typeOptions } from "@widgets/Pack/const/typeOptions";
import { PackEdit } from "../PackEdit/PackEdit";
import { PackDelete } from "../PackDelete/PackDelete";

interface PacksTableProps {
    dataSource: PackSchema[];
    isFetching: boolean;
    error: unknown;
}

export const PackTable: FC<PacksTableProps> = (props) => {
    const { dataSource, isFetching, error } = props;
    const { t } = useTranslation(TranslationId.PACK);
    const rowSpacing = useAppSelector(selectSpacing);

    const allColumns = useMemo(
        () =>
            generateColumns<PackSchema>([
                {
                    title: t("name"),
                    dataIndex: "name",
                    key: "name",
                },
                {
                    title: t("type"),
                    dataIndex: "type",
                    key: "type",
                    render: (_, record) => (
                        <span>
                            {t(
                                typeOptions.find((el) => el.value === String(record.type))?.label ||
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
                            <PackEdit pack={record} />
                            <PackDelete pack={record} />
                        </Flex>
                    ),
                },
            ]),
        [t],
    );

    const { columnsConfig, visibleColumns, setVisibleColumns, filteredColumns } = useColumns(
        allColumns,
        "packsTable",
    );

    const expandedRowRender = (record: PackSchema) => (
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
            <TableComponent<PackSchema>
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
