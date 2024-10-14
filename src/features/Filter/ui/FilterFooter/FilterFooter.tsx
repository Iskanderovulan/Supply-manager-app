import React from "react";
import { Button, Flex } from "antd";

interface FilterFooterProps {
    onApply: () => void;
    onReset: () => void;
}

export const FilterFooter: React.FC<FilterFooterProps> = ({ onApply, onReset }) => (
    <div>
        <Flex gap="middle" justify="end" align="center">
            <Button onClick={onReset}>Reset</Button>
            <Button type="primary" onClick={onApply}>
                Apply Filters
            </Button>
        </Flex>
    </div>
);
