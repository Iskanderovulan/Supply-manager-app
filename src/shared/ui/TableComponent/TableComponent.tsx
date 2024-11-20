import { Table, TableProps, Empty } from "antd";

interface TableComponentProps<T extends object> extends TableProps<T> {
    emptyMessage?: string;
    rowSpacing?: number;
}

export const TableComponent = <T extends object>({
    columns,
    dataSource,
    emptyMessage = "No data available",
    rowSpacing,
    ...rest
}: TableComponentProps<T>) => {
    const tableStyle: React.CSSProperties = {
        width: "100%",
        overflowX: "auto" as const,
    };

    // Using inline styles for row spacing to ensure consistent height adjustment,
    // as class-based styling was not effective in overriding Ant Design defaults
    const resolvedRowSpacing = rowSpacing ?? 74;

    const onRow = () => ({
        style: {
            height: `${resolvedRowSpacing}px`,
            paddingTop: 0,
            paddingBottom: 0,
        },
    });

    return (
        <div style={tableStyle}>
            <Table<T>
                columns={columns}
                dataSource={Array.isArray(dataSource) ? dataSource : []}
                scroll={{ x: "max-content", y: "calc(100vh - 400px)" }}
                pagination={false}
                onRow={onRow}
                locale={{
                    emptyText: <Empty description={emptyMessage} />,
                }}
                {...rest}
            />
        </div>
    );
};
