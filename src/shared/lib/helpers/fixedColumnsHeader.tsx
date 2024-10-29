import { Column } from "@shared/types/column";

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

export const generateColumns = <T,>(columns: Column<T>[]) => {
    columns = fixedColumnsHeader(columns);
    return columns;
};
