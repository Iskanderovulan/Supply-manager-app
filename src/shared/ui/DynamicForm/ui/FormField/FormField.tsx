import { FC } from "react";
import { Form, Input, Select } from "antd";
import { FormRecord } from "../../model/types/types";

interface FormFieldProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    rules: FormRecord[];
    options?: { label: string; value: string | number }[];
}

export const FormField: FC<FormFieldProps> = (props) => {
    const { label, name, type, placeholder, rules, options } = props;
    const renderField = () => {
        switch (type) {
            case "select":
                return (
                    <Select className="custom-select" placeholder={placeholder}>
                        {options?.map((option) => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                );
            case "password":
                return <Input.Password allowClear placeholder={placeholder} />;
            default:
                return <Input allowClear type={type} placeholder={placeholder} />;
        }
    };

    return (
        <Form.Item label={label} name={name} rules={rules}>
            {renderField()}
        </Form.Item>
    );
};
