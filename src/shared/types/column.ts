import { ReactNode } from "react";

export interface Column<T> {
    title: string;
    dataIndex?: keyof T | string;
    key: string;
    render?: (text: T[keyof T], record: T, index: number) => ReactNode;
}
