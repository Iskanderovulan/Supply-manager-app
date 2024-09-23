import React from "react";
import classNames from "classnames";
import { Table, TableProps } from "antd";
import { Loader } from "shared/ui/Loader/Loader";
import cls from "./TableComponent.module.scss";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

interface TableComponentProps<T extends object> extends TableProps<T> {
    isLoading: boolean;
    error: unknown;
}

export const TableComponent = <T extends object>({
    columns,
    dataSource,
    isLoading,
    error,
    ...rest
}: TableComponentProps<T>) => {
    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        return <ErrorMessage error={error} />;
    }

    if (!dataSource || dataSource.length === 0) {
        return <div>No data available.</div>;
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
