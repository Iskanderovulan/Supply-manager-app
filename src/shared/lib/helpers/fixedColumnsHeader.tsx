import { ReactNode } from "react";

interface Column<T> {
    title: string;
    dataIndex?: keyof T | string;
    key: string;
    render?: (text: T[keyof T], record: T, index: number) => ReactNode;
}

// Функция для добавления заголовка в первую строку
const fixedColumnsHeader = <T,>(columns: Column<T>[]): Column<T>[] => {
    return columns.map((column) => {
        const originalRender = column.render;
        const newRender = (text: T[keyof T], record: T, index: number) => (
            <>
                {index === 0 && (
                    <div
                        style={{
                            overflow: "hidden",
                            height: 0,
                        }}
                    >
                        {column.title}
                    </div>
                )}
                {originalRender ? originalRender(text, record, index) : text}
            </>
        );

        return { ...column, render: newRender };
    });
};

// Генерация колонок с использованием типизации
export const generateColumns = <T,>(columns: Column<T>[]) => {
    columns = fixedColumnsHeader(columns);
    return columns;
};
