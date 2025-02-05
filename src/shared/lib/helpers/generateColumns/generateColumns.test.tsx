import { describe, it, expect } from "vitest";
import { generateColumns } from "./generateColumns";
import { Column } from "@shared/types/column";

describe("generateColumns", () => {
    it("should add a fixed header render for the first row in each column", () => {
        const columns: Column<{ key: string }>[] = [
            {
                key: "col1",
                title: "Column 1",
                dataIndex: "key",
                render: (text) => <span>{text}</span>,
            },
            {
                key: "col2",
                title: "Column 2",
                dataIndex: "key",
            },
        ];

        const result = generateColumns(columns);

        result.forEach((column, index) => {
            expect(column.render).toBeDefined();
            const text = "Example text";

            const rendered = column.render?.(text, { key: "test" }, 0);

            expect(rendered).toEqual(
                <>
                    <div style={{ overflow: "hidden", height: 0 }}>{column.title}</div>
                    {columns[index].render ? columns[index].render(text, { key: "test" }, 0) : text}
                </>,
            );
        });
    });

    it("should fallback to text rendering if no render is defined in the column", () => {
        const columns: Column<{ key: string }>[] = [
            {
                key: "col1",
                title: "Column 1",
                dataIndex: "key",
            },
        ];

        const result = generateColumns(columns);

        const text = "Example text";
        const rendered = result[0].render?.(text, { key: "test" }, 0);

        expect(rendered).toEqual(
            <>
                <div style={{ overflow: "hidden", height: 0 }}>Column 1</div>
                Example text
            </>,
        );
    });

    it("should preserve the original column properties", () => {
        const columns: Column<{ key: string }>[] = [
            {
                key: "col1",
                title: "Column 1",
                dataIndex: "key",
            },
        ];

        const result = generateColumns(columns);

        expect(result[0].dataIndex).toBe(columns[0].dataIndex);
    });
});
