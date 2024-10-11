import { useCallback, useEffect, ReactNode } from "react";
import { Form, Input, Button, ButtonProps, Select } from "antd";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import cls from "./DynamicForm.module.scss";

type FormRecord = Record<string, unknown>;
type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object
        ? RecursivePartial<T[P]>
        : T[P];
};

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
    translation?: TranslationId;
    header?: ReactNode;
    updateValues?: RecursivePartial<T>;
}

export const DynamicForm = <T,>({
    config,
    onFinish,
    handlers,
    translation,
    loading,
    header,
    className = "",
    updateValues,
}: DynamicFormProps<T>) => {
    const { t } = useTranslation(translation);
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
        <div className={classNames(className)}>
            <div>
                {header && <div className={cls.header}>{header}</div>}
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    {config.fields.map((field, index) => (
                        <Form.Item
                            key={index}
                            label={t(field.label)}
                            name={field.name as string}
                            rules={field.rules.map((rule) => ({
                                ...rule,
                                message: t(rule.message as string),
                            }))}
                        >
                            {field.type === "select" ? (
                                <Select
                                    className="custom-select"
                                    placeholder={t(field.placeholder)}
                                >
                                    {field.options?.map((option) => (
                                        <Select.Option key={option.value} value={option.value}>
                                            {t(option.label)}
                                        </Select.Option>
                                    ))}
                                </Select>
                            ) : field.type === "password" ? (
                                <Input.Password allowClear placeholder={t(field.placeholder)} />
                            ) : (
                                <Input
                                    allowClear
                                    type={field.type}
                                    placeholder={t(field.placeholder)}
                                />
                            )}
                        </Form.Item>
                    ))}
                    <div className={cls.buttonWrap}>
                        {config.buttons.map((button, index) => (
                            <Button
                                key={index}
                                type={button.type as ButtonProps["type"]}
                                htmlType={button.htmlType as ButtonProps["htmlType"]}
                                loading={loading}
                                onClick={() => handleButtonClick(button.onClick)}
                            >
                                {t(button.label)}
                            </Button>
                        ))}
                    </div>
                </Form>
            </div>
        </div>
    );
};
