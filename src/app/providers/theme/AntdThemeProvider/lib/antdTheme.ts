import { theme } from "antd";

const { defaultAlgorithm } = theme;

export const defaultTheme = {
    algorithm: defaultAlgorithm,
    token: {
        colorPrimary: "var(--primary-color)",
        colorTextBase: "var(--text-color)",
        colorBgContainer: "var(--secondary-bg-color)",
    },
    components: {
        Button: {
            colorPrimary: "var(--primary-color)",
            colorPrimaryHover: "var(--primary-color-hover)",
            colorPrimaryActive: "var(--primary-color-active)",
            colorBgContainer: "var(--input-bg-color)",
            colorText: "var(--text-color)",
            colorBorder: "var(--border-color)",
        },

        Layout: {
            headerBg: "var(--secondary-bg-color)",
            bodyBg: "var(--bg-color)",
            footerBg: "var(--secondary-bg-color)",
        },
        Menu: {
            itemBg: "transparent",
            itemSelectedBg: "var(--sidebar-selected-bg-color)",
            itemSelectedColor: "var(--sidebar-selected-text-color)",
            itemHoverBg: "var(--sidebar-hover-bg-color)",
            itemColor: "var(--text-color)",
            itemHoverColor: "var(--text-color)",
            popupBg: "var(--secondary-bg-color)",
        },
        Form: {
            labelColor: "var(--text-color)",
            labelRequiredMarkColor: "var(--error-color)",
        },
        Input: {
            colorPrimary: "var(--border-selected-color)",
            colorText: "var(--text-color)",
            colorBgContainer: "var(--secondary-bg-color)",
            colorBorder: "var(--border-color)",
            colorPlaceholder: "var(--text-color)",
            hoverBorderColor: "var(--border-selected-color)",
            activeShadow: "var(--active-shadow)",
            colorTextPlaceholder: "var(--input-placeholder-color)",
        },
        Modal: {
            contentBg: "var(--secondary-bg-color)",
            headerBg: "var(--secondary-bg-color)",
            titleColor: "var(--text-color)",
            colorIcon: "var(--text-color)",
            colorIconHover: "var(--text-color)",
        },
        Select: {
            colorBorder: "var(--border-color)",
            hoverBorderColor: "var(--border-selected-color)",
            optionSelectedColor: "var(--text-color)",
            optionSelectedBg: "var(--select-selected-bg)",
            colorText: "var(--text-color)",
            colorBgElevated: "var(--select-dropdown-bg)",
            optionActiveBg: "var(--select-active-bg)",
            colorTextPlaceholder: "var(--border-color)",
        },
        Table: {
            headerColor: "var(--text-color)",
            colorText: "var(--table-text)",
            headerBg: "var(--table-header-bg)",
            borderColor: "var(--table-border)",
            rowHoverBg: "var(--table-row-hover)",
            colorBgContainer: "var(--table-bg)",
        },
        Pagination: {
            colorText: "var(--text-color)",
        },
        Drawer: {
            colorBgElevated: "var(--secondary-bg-color)",
            colorText: "var(--text-color)",
        },
        Checkbox: {
            colorPrimary: "var(--border-selected-color)",
            colorWhite: "var(--checkbox-color)",
            colorBorder: "var(--border-color)",
            colorText: "var(--text-color)",
            colorTextHover: "var(--text-color)",
        },
        DatePicker: {
            colorBgContainer: "var(--secondary-bg-color)",
            colorTextPlaceholder: "var(--text-color)",
            cellActiveWithRangeBg: "var(--accent-color)",
            controlOutline: "unset",
        },
    },
};
