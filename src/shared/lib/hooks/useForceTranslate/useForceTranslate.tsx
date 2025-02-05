import { useEffect } from "react";
import { FormInstance } from "antd";
import { InternalNamePath } from "antd/es/form/interface";
import { useTranslation } from "react-i18next";

export const useForceTranslate = <T,>({ form }: { form: FormInstance<T> }) => {
    const { i18n } = useTranslation();

    useEffect(() => {
        form.getFieldsError().forEach(
            ({ name, errors }: { name: InternalNamePath; errors: string[] }) => {
                if (errors.length > 0) {
                    form.validateFields([name]);
                }
            },
        );
    }, [i18n.language, form]);
    return;
};
