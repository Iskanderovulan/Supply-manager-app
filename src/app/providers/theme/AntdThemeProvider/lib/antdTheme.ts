import { theme } from "antd";

const { defaultAlgorithm } = theme;

export const defaultTheme = {
    algorithm: defaultAlgorithm,
    token: {
        colorPrimary: "var(--primary-color)",
        colorTextBase: "var(--text-color)",
        colorBgContainer: "var(--secondary-bg-color)", // Фон контейнеров
    },
    components: {
        Button: {
            colorPrimary: "var(--primary-color)",
            colorPrimaryHover: "var(--primary-color-hover)",
            colorPrimaryActive: "var(--primary-color-active)", // Используем кастомный токен
            colorBgContainer: "var(--input-bg-color)", // Фон инпута
            colorText: "var(--text-color)", // Цвет текста кнопки
            colorBorder: "var(--border-color)", // Цвет границы кнопки
        },

        Layout: {
            headerBg: "var(--secondary-bg-color)", // Фон для Header
            bodyBg: "var(--bg-color)", // Фон для всего Layout
            footerBg: "var(--secondary-bg-color)",
        },
        Menu: {
            itemBg: "transparent", // Фон элементов меню
            itemSelectedBg: "var(--sidebar-selected-bg-color)", // Фон выбранного элемента
            itemSelectedColor: "var(--sidebar-selected-text-color)", // Цвет текста выбранного элемента
            itemHoverBg: "var(--sidebar-hover-bg-color)", // Фон при наведении
            itemColor: "var(--text-color)", // Цвет текста
            itemHoverColor: "var(--text-color)", // Цвет текста при наведении
            popupBg: "var(--secondary-bg-color)",
        },
        Form: {
            labelColor: "var(--text-color)", // Цвет текста для label
            fontSizeLabel: 14, // Размер шрифта для label
            labelRequiredMarkColor: "var(--error-color)", // Цвет текста для обязательного label
        },
        Input: {
            colorText: "var(--text-color)", // Цвет текста в инпуте
            colorBgContainer: "var(--secondary-bg-color)", // Фон инпута
            colorBorder: "var(--border-color)", // Цвет границы инпута
            colorPlaceholder: "var(--text-color)", // Цвет плейсхолдера
            hoverBorderColor: "var(--border-selected-color)",
            activeShadow: "var(--active-shadow)",
            colorTextPlaceholder: "var(--input-placeholder-color)",
        },
        Modal: {
            contentBg: "var(--secondary-bg-color)",
            headerBg: "var(--secondary-bg-color)",
            titleColor: "var(--text-color)",
            colorIcon: "var(--text-color)",
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
    },
};
