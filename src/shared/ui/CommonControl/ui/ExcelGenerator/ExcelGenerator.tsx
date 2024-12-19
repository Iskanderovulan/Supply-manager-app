import { memo } from "react";
import { Button } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import type { TFunction } from "i18next";
import { LOCAL_STORAGE_LANG_KEY } from "@shared/const/localstorage";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { useExcelNotification } from "./lib/useExcelNotification";

interface IProps<T, K> {
    data: T[];
    t: TFunction;
    fileName: string;
    excelConfig: (item: T, t: TFunction, lang: string) => K;
}

function ExcelGeneratorComponent<T, K extends object>(props: IProps<T, K>) {
    const { data, t, fileName, excelConfig } = props;
    const lang = localStorage.getItem(LOCAL_STORAGE_LANG_KEY) || "en";
    const { t: notify } = useTranslation(TranslationId.NOTIFICATION);
    const { isSuccess, isError, setIsSuccess, setIsError, resetNotification } =
        useExcelNotification();

    useNotification({
        isError,
        isSuccess,
        error: isError ? { message: notify("downloadError") } : undefined,
        notificationKey: NotificationData.downloadSuccess,
        reset: resetNotification,
    });

    const transformDataForCSV = (data: T[]) => {
        return data.map((item) => excelConfig(item, t, lang));
    };

    const getMaxColumnWidths = (csvData: K[]) => {
        const headers = Object.keys(csvData[0]) as (keyof K)[];
        return headers.map((header) => {
            let maxLen = String(header).length;
            csvData.forEach((row) => {
                const cellValue = row[header];
                const length =
                    typeof cellValue === "string" ? cellValue.length : String(cellValue).length;
                if (length > maxLen) maxLen = length;
            });
            return { wch: maxLen + 3 };
        });
    };

    const exportToCSV = (csvData: K[]) => {
        try {
            const fileType =
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const ws = XLSX.utils.json_to_sheet(csvData);
            const maxWidths = getMaxColumnWidths(csvData);
            ws["!cols"] = maxWidths;
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const dataBlob = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(dataBlob, `${fileName}.xlsx`);
            setIsSuccess(true);
        } catch (error) {
            setIsError(true);
        }
    };

    return (
        <Button
            type="primary"
            icon={<FileExcelOutlined />}
            onClick={() => exportToCSV(transformDataForCSV(data))}
        >
            Excel
        </Button>
    );
}

export const ExcelGenerator = memo(ExcelGeneratorComponent) as typeof ExcelGeneratorComponent;
