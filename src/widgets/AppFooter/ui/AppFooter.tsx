import classNames from "classnames";
import { Layout } from "antd";
import cls from "./AppFooter.module.scss";
const { Footer } = Layout;

export const AppFooter = () => {
    console.log("rerender");

    return (
        <Footer className={classNames(cls.AppFooter)}>CRM SYSTEM {new Date().getFullYear()}</Footer>
    );
};
