import { useCallback, useEffect, ReactNode } from "react";
import { Form } from "antd";
import { FormHeader } from "../FormHeader/FormHeader";
import { FormField } from "../FormField/FormField";
import { FormButtons } from "../FormButtons/FormButtons";
import { FormRecord, RecursivePartial } from "../../model/types/types";
import classNames from "classnames";
import cls from "./DynamicForm.module.scss";

interface DynamicFormProps<T> {
    config: {
        fields: {
            label: string;
            name: T[keyof T];
            type: string;
            placeholder: string;
            rules: FormRecord[];
            options?: { label: string; value: string | number }[];
        }[];
        buttons: {
            label: string;
            type: string;
            htmlType: string;
            className?: string;
            onClick?: string;
        }[];
    };
    onFinish: (values: T) => void;
    handlers?: {
        [key: string]: (values?: T) => void;
    };
    loading?: boolean;
    className?: string;
    header?: ReactNode;
    updateValues?: RecursivePartial<T>;
}

export const DynamicForm = <T,>(props: DynamicFormProps<T>) => {
    const { config, onFinish, handlers, loading, header, className = "", updateValues } = props;
    const [form] = Form.useForm<T>();

    useEffect(() => {
        if (updateValues) {
            form.setFieldsValue(updateValues);
        }
    }, [updateValues, form]);

    const handleButtonClick = useCallback(
        (handlerKey?: string) => {
            if (handlerKey && handlers) {
                handlers[handlerKey]?.();
            }
        },
        [handlers],
    );

    return (
        <div className={classNames(cls.dynamicForm, className)}>
            <FormHeader header={header} />
            <Form layout="vertical" onFinish={onFinish} form={form}>
                {config.fields.map((field, index) => (
                    <FormField
                        key={index}
                        label={field.label}
                        name={field.name as string}
                        type={field.type}
                        placeholder={field.placeholder}
                        rules={field.rules}
                        options={field.options}
                    />
                ))}
                <FormButtons
                    buttons={config.buttons}
                    loading={loading}
                    handleButtonClick={handleButtonClick}
                />
            </Form>
        </div>
    );
};
