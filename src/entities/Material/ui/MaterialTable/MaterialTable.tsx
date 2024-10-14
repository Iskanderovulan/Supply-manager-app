import { FC } from "react";
import { MaterialSchema } from "@entities/Material/model/types/materialSchema";
import { generateColumns } from "@shared/lib/helpers/fixedColumnsHeader";
import { hardnessOptions } from "@entities/Material/model/const/hardnessOptions";
import { generateDate } from "@shared/lib/helpers/generateDate";
import { TableComponent } from "@shared/ui/TableComponent";
import { EditMaterial } from "../EditMaterial/EditMaterial";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { DeleteMaterial } from "../DeleteMaterial/DeleteMaterial";
import { Flex } from "antd";

interface MaterialsTableProps {
    dataSource: MaterialSchema[];
    isLoading: boolean;
    error: unknown;
}

export const MaterialsTable: FC<MaterialsTableProps> = (props) => {
    const { dataSource, isLoading, error } = props;

    const { t } = useTranslation(TranslationId.MATERIAL);

    const columns = generateColumns<MaterialSchema>([
        {
            title: t("id"),
            dataIndex: "id",
            key: "id",
        },
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
                    {t(hardnessOptions.find((el) => el.value === record.hardness)?.label || "")}
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
            key: "actions",
            render: (_, record) => (
                <>
                    <Flex gap="middle">
                        <EditMaterial material={record} />
                        <DeleteMaterial material={record} />
                    </Flex>
                </>
            ),
        },
    ]);

    return (
        <>
            <TableComponent<MaterialSchema>
                columns={columns}
                dataSource={dataSource}
                isLoading={isLoading}
                error={error}
                rowKey="id"
            />
        </>
    );
};
