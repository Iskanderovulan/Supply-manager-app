import { useEffect, ReactNode } from "react";
import { Form } from "antd";
import { useForceTranslate } from "@shared/lib/hooks/useForceTranslate";
import { FormHeader } from "../FormHeader/FormHeader";
import { FormField } from "../FormField/FormField";
import { FormButtons } from "../FormButtons/FormButtons";
import { FormRecord, RecursivePartial } from "../../model/types/types";
import cls from "./DynamicForm.module.scss";

export interface DynamicFormProps<T> {
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
    header?: ReactNode;
    updateValues?: RecursivePartial<T>;
}

export const DynamicForm = <T,>(props: DynamicFormProps<T>) => {
    const { config, onFinish, handlers, loading, header, updateValues } = props;

    const [form] = Form.useForm<T>();

    useEffect(() => {
        if (updateValues) {
            form.setFieldsValue(updateValues);
        }
    }, [updateValues, form]);

    const handleButtonClick = (handlerKey?: string) => {
        if (handlerKey && handlers) {
            handlers[handlerKey]?.();
        }
    };

    useForceTranslate({ form });

    return (
        <div className={cls.dynamicForm}>
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
