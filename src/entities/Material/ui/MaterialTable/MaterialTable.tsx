import { useGetMaterialsQuery } from "entities/Material/model/api/materialApi";
import { MaterialSchema } from "entities/Material/model/types/materialSchema";
import { generateColumns } from "shared/lib/helpers/fixedColumnsHeader";
import { hardnessOptions } from "entities/Material/model/const/material";
import { generateDate } from "shared/lib/helpers/generateDate";
import { TableComponent } from "shared/ui/TableComponent/TableComponent";

export const MaterialsTable: React.FC = () => {
    const { data: materials, isLoading, error } = useGetMaterialsQuery();

    const columns = generateColumns<MaterialSchema>([
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Hardness",
            dataIndex: "hardness",
            key: "hardness",
            render: (_, record) => (
                <span>{hardnessOptions.find((el) => el.value === record.hardness)?.label}</span>
            ),
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => <span>{generateDate(date)}</span>,
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (date) => <span>{generateDate(date)}</span>,
        },
        {
            title: "Actions",
            key: "actions",
            render: () => <span>Edit</span>,
        },
    ]);

    return (
        <>
            <TableComponent<MaterialSchema>
                columns={columns}
                dataSource={materials?.results}
                isLoading={isLoading}
                error={error}
                rowKey="id"
            />
        </>
    );
};
