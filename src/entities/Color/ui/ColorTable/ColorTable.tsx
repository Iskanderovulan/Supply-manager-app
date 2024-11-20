import { FC, useMemo } from "react";
import { ColorSchema } from "@entities/Color/model/types/colorSchema";
import { generateColumns } from "@shared/lib/helpers/generateColumns/generateColumns";
import { intensityOptions } from "@entities/Color/model/const/intensityOptions";
import { generateDate } from "@shared/lib/helpers/generateDate/generateDate";
import { TableComponent } from "@shared/ui/TableComponent";
import { ColorEdit } from "../ColorEdit/ColorEdit";
import { ColorDelete } from "../ColorDelete/ColorDelete";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { Flex } from "antd";
import { ColumnManager } from "@shared/ui/ColumnManager";
import { useColumns } from "@shared/lib/hooks/useColumns";
import { Loader } from "@shared/ui/Loader";
import { ErrorMessage } from "@shared/ui/ErrorMessage";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector";
import { RowDensity, selectSpacing } from "@shared/ui/RowDensity";

interface ColorsTableProps {
    dataSource: ColorSchema[];
    isLoading: boolean;
    error: unknown;
}

export const ColorsTable: FC<ColorsTableProps> = (props) => {
    const { dataSource, isLoading, error } = props;
    const { t } = useTranslation(TranslationId.COLOR);
    const rowSpacing = useAppSelector(selectSpacing);

    const allColumns = useMemo(
        () =>
            generateColumns<ColorSchema>([
                {
                    title: t("name"),
                    dataIndex: "name",
                    key: "name",
                },
                {
                    title: t("intensity"),
                    dataIndex: "intensity",
                    key: "intensity",
                    render: (_, record) => (
                        <span>
                            {t(
                                intensityOptions.find((el) => el.value === record.intensity)?.label ||
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
                            <ColorEdit color={record} />
                            <ColorDelete color={record} />
                        </Flex>
                    ),
                },
            ]),
        [t],
    );

    const { columnsConfig, visibleColumns, setVisibleColumns, filteredColumns } = useColumns(
        allColumns,
        "colorsTable",
    );

    const expandedRowRender = (record: ColorSchema) => (
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
            <TableComponent<ColorSchema>
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
