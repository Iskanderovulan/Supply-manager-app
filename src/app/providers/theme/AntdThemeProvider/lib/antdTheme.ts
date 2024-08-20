import { theme } from "antd";

const { defaultAlgorithm, darkAlgorithm } = theme;

export const lightTheme = {
    algorithm: defaultAlgorithm,
    token: {
        colorPrimary: "var(--primary-color)",
        colorTextBase: "var(--text-color)",
        borderRadius: 4,
        colorBgContainer: "var(--secondary-bg-color)", // Фон контейнеров
    },
    components: {
        Button: {
            colorPrimary: "var(--primary-color)",
            colorPrimaryHover: "var(--primary-color-hover)",
            colorBgContainer: "var(--secondary-bg-color)", // Фон кнопки
            colorText: "var(--text-color)", // Цвет текста кнопки
            colorBorder: "var(--border-color)", // Цвет границы кнопки
            borderRadius: 4,
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
    },
};

export const darkTheme = {
    algorithm: darkAlgorithm,
    token: {
        colorPrimary: "var(--primary-color)",
        colorTextBase: "var(--text-color)",
        borderRadius: 4,
        colorBgContainer: "var(--secondary-bg-color)", // Фон контейнеров
    },
    components: {
        Button: {
            colorPrimary: "var(--primary-color)",
            colorPrimaryHover: "var(--primary-color-hover)",
            colorBgContainer: "var(--secondary-bg-color)", // Фон кнопки
            colorText: "var(--text-color)", // Цвет текста кнопки
            colorBorder: "var(--border-color)", // Цвет границы кнопки
            borderRadius: 4,
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
    },
};
