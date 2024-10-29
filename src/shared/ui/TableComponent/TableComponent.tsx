import classNames from "classnames";
import { Table, TableProps, Empty } from "antd";
import { Loader } from "@shared/ui/Loader";
import cls from "./TableComponent.module.scss";
import { ErrorMessage } from "../ErrorMessage";

interface TableComponentProps<T extends object> extends TableProps<T> {
    isLoading: boolean;
    error: unknown;
    emptyMessage?: string;
}

export const TableComponent = <T extends object>(props: TableComponentProps<T>) => {
    const {
        columns,
        dataSource,
        isLoading,
        error,
        emptyMessage = "No data available",
        ...rest
    } = props;

    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        return <ErrorMessage error={error} />;
    }

    return (
        <div className={classNames(cls.TableComponent)}>
            <Table<T>
                columns={columns}
                dataSource={dataSource}
                scroll={{ x: "max-content", y: "calc(100vh - 400px)" }}
                pagination={false}
                locale={{
                    emptyText: <Empty description={emptyMessage} />,
                }}
                {...rest}
            />
        </div>
    );
};
