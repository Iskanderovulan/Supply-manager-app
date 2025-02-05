import { FC, useMemo } from "react";
import { Modal, Button, Checkbox, Space, Flex } from "antd";
import { TableOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useModal } from "@shared/lib/hooks/useModal";
import cls from "./ColumnManager.module.scss";

export interface ColumnManagerProps {
    columnsConfig: Array<{ key: string; title: string }>;
    visibleColumns: string[];
    onVisibleColumnsChange: (visibleColumns: string[]) => void;
}

export const ColumnManager: FC<ColumnManagerProps> = (props) => {
    const { columnsConfig, visibleColumns, onVisibleColumnsChange } = props;
    const { t: global } = useTranslation();
    const { isModalOpen, showModal, hideModal } = useModal();

    const options = useMemo(
        () => columnsConfig.map((col) => ({ label: col.title, value: col.key })),
        [columnsConfig],
    );

    const handleCheckboxChange = (checkedValues: Array<string>) => {
        onVisibleColumnsChange(checkedValues);
    };

    const handleSelectAll = () => {
        const allKeys = columnsConfig.map((col) => col.key);
        onVisibleColumnsChange(allKeys);
    };

    const handleReset = () => {
        onVisibleColumnsChange([]);
    };

    return (
        <>
            <Flex justify="start">
                <Button onClick={showModal} data-testid="manage-columns-button">
                    {global("manageColumns")} ({visibleColumns.length}/{columnsConfig.length})
                    <Space>
                        <TableOutlined />
                    </Space>
                </Button>
            </Flex>

            <Modal
                title={global("manageColumns")}
                open={isModalOpen}
                onCancel={hideModal}
                onOk={hideModal}
                footer={[
                    <Button
                        key="columns"
                        type="primary"
                        onClick={hideModal}
                        data-testid="ok-button"
                    >
                        {global("ok")}
                    </Button>,
                ]}
            >
                <Flex gap="small" className={cls.buttonGroup}>
                    <Button
                        size="small"
                        type="dashed"
                        key="deselectAll"
                        onClick={handleReset}
                        data-testid="deselect-all-button"
                    >
                        {global("deselectAll")}
                    </Button>

                    <Button
                        size="small"
                        type="dashed"
                        key="selectAll"
                        onClick={handleSelectAll}
                        data-testid="select-all-button"
                    >
                        {global("selectAll")}
                    </Button>
                </Flex>
                <Checkbox.Group
                    options={options}
                    value={visibleColumns}
                    onChange={handleCheckboxChange}
                    className={cls.checkboxGroup}
                    data-testid="checkbox-group"
                />
            </Modal>
        </>
    );
};
