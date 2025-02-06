import { Table, TableProps, Empty } from "antd";
import { useTranslation } from "react-i18next";

interface TableComponentProps<T extends object> extends TableProps<T> {
    rowSpacing?: number;
}

export const TableComponent = <T extends object>({
    columns,
    dataSource,
    rowSpacing,
    ...rest
}: TableComponentProps<T>) => {
    const { t: global } = useTranslation();

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
                    emptyText: <Empty description={global("noDataAvailable")} />,
                }}
                {...rest}
            />
        </div>
    );
};
