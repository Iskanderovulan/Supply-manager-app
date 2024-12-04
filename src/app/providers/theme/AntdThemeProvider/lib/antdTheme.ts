import { theme } from "antd";

const { defaultAlgorithm } = theme;

export const defaultTheme = {
    algorithm: defaultAlgorithm,
    token: {
        colorPrimary: "var(--primary-color)",
        colorTextBase: "var(--inverse-color)",
        colorBgContainer: "var(--secondary-bg-color)",
    },
    components: {
        Button: {
            colorPrimary: "var(--primary-color)",
            colorPrimaryHover: "var(--primary-color-hover)",
            colorPrimaryActive: "var(--primary-color-active)",
            colorBgContainer: "var(--input-bg-color)",
            colorText: "var(--inverse-color)",
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
            itemColor: "var(--inverse-color)",
            itemHoverColor: "var(--inverse-color)",
            popupBg: "var(--secondary-bg-color)",
        },
        Form: {
            labelColor: "var(--inverse-color)",
            labelRequiredMarkColor: "var(--error-color)",
        },
        Input: {
            colorPrimary: "var(--border-selected-color)",
            colorText: "var(--inverse-color)",
            colorBgContainer: "var(--secondary-bg-color)",
            colorBorder: "var(--border-color)",
            colorPlaceholder: "var(--inverse-color)",
            hoverBorderColor: "var(--border-selected-color)",
            activeShadow: "var(--active-shadow)",
            colorTextPlaceholder: "var(--input-placeholder-color)",
        },
        Modal: {
            contentBg: "var(--secondary-bg-color)",
            headerBg: "var(--secondary-bg-color)",
            titleColor: "var(--inverse-color)",
            colorIcon: "var(--inverse-color)",
            colorIconHover: "var(--inverse-color)",
        },
        Select: {
            colorBorder: "var(--border-color)",
            hoverBorderColor: "var(--border-selected-color)",
            optionSelectedColor: "var(--inverse-color)",
            optionSelectedBg: "var(--select-selected-bg)",
            colorText: "var(--inverse-color)",
            colorBgElevated: "var(--select-dropdown-bg)",
            optionActiveBg: "var(--select-active-bg)",
            colorTextPlaceholder: "var(--border-color)",
        },
        Table: {
            headerColor: "var(--inverse-color)",
            colorText: "var(--table-text)",
            headerBg: "var(--table-header-bg)",
            borderColor: "var(--table-border)",
            rowHoverBg: "var(--table-row-hover)",
            colorBgContainer: "var(--table-bg)",
        },
        Pagination: {
            colorText: "var(--inverse-color)",
        },
        Drawer: {
            colorBgElevated: "var(--secondary-bg-color)",
            colorText: "var(--inverse-color)",
        },
        Checkbox: {
            colorPrimary: "var(--border-selected-color)",
            colorWhite: "var(--checkbox-color)",
            colorBorder: "var(--border-color)",
            colorText: "var(--inverse-color)",
            colorTextHover: "var(--inverse-color)",
        },
        DatePicker: {
            colorBgContainer: "var(--secondary-bg-color)",
            colorTextPlaceholder: "var(--inverse-color)",
            cellActiveWithRangeBg: "var(--accent-color)",
            controlOutline: "unset",
        },
        Dropdown: {
            colorBgElevated: "var(--select-dropdown-bg)",
        },
        Breadcrumb: {
            itemColor: "var(--inverse-color)",
            lastItemColor: "var(--inverse-color)",
        },
        Slider: {
            trackBg: "var(--track-bg)",
            trackHoverBg: "var(--track-bg)",
            railBg: "var(--rail-bg)",
            railHoverBg: "var(--rail-bg)",
        },
    },
};
