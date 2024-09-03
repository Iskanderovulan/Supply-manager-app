import { useCallback } from "react";
import { Form, Input, Button, ButtonProps } from "antd";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { TranslationId } from "shared/const/translation";
import cls from "./DynamicForm.module.scss";

type FormRecord = Record<string, unknown>;

interface DynamicFormProps<T> {
    config: {
        fields: {
            label: string;
            name: T[keyof T];
            type: string;
            placeholder: string;
            rules: FormRecord[];
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
}

export const DynamicForm = <T,>({
    config,
    onFinish,
    handlers,
    translation,
    loading,
    className = "",
}: DynamicFormProps<T>) => {
    const { t } = useTranslation(translation);
    const [form] = Form.useForm<T>();

    const handleButtonClick = useCallback(
        (handlerKey?: string) => {
            if (handlerKey && handlers) {
                const values = form.getFieldsValue();
                console.log(values);
                handlers[handlerKey]?.(values);
            }
        },
        [form, handlers],
    );

    return (
        <div className={classNames("", {}, [className])}>
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
                        {field.type === "password" ? (
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
    );
};
