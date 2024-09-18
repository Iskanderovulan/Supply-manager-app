import { Table } from "antd";
import { useGetMaterialsQuery } from "entities/Material/model/api/materialApi";
import { MaterialSchema } from "entities/Material/model/types/materialSchema";
import { generateColumns } from "shared/lib/helpers/fixedColumnsHeader";
import { hardnessOptions } from "entities/Material/model/const/material";
import { generateDate } from "shared/lib/helpers/generateDate";
import { Loader } from "shared/ui/Loader/Loader";

export const MaterialsTable: React.FC = () => {
    const { data: materials, isLoading, error } = useGetMaterialsQuery();
    console.log(materials);

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
            render: (_, record) => <span>Edit</span>,
        },
    ]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error loading materials.</div>;
    }

    return (
        <>
            {Array.isArray(materials?.results) && materials?.results.length > 0 && (
                <div className="table-container">
                    <Table
                        dataSource={materials?.results}
                        columns={columns}
                        loading={isLoading}
                        pagination={false}
                        rowKey="id"
                        scroll={{ x: "max-content", y: "calc(100vh - 400px)" }}
                    />
                </div>
            )}
        </>
    );
};
