import classNames from "classnames";
import { Table, TableProps } from "antd";
import { Loader } from "@shared/ui/Loader";
import cls from "./TableComponent.module.scss";
import { ErrorMessage } from "../ErrorMessage";
import { Title } from "../Title";

interface TableComponentProps<T extends object> extends TableProps<T> {
    isLoading: boolean;
    error: unknown;
}

export const TableComponent = <T extends object>(props: TableComponentProps<T>) => {
    const { columns, dataSource, isLoading, error, ...rest } = props;

    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        return <ErrorMessage error={error} />;
    }

    if (!dataSource || dataSource.length === 0) {
        return <Title text="No data available" marginBottom="none" />;
    }

    return (
        <>
            {Array.isArray(dataSource) && dataSource.length > 0 && (
                <div className={classNames(cls.TableComponent)}>
                    <Table<T>
                        columns={columns}
                        dataSource={dataSource}
                        scroll={{ x: "max-content", y: "calc(100vh - 400px)" }}
                        pagination={false}
                        {...rest}
                    />
                </div>
            )}
        </>
    );
};
