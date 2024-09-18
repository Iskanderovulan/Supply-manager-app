import { FC } from "react";
import classNames from "classnames";
import cls from "./Material.module.scss";
import { CreateMaterial } from "../CreateMaterial/CreateMaterial";
import { MaterialsTable } from "../MaterialTable/MaterialTable";
import { Flex } from "antd";

export const Material: FC = () => {
    return (
        <div className={classNames(cls.Material)}>
            <Flex gap="middle" vertical align="start">
                <Flex>
                    <CreateMaterial />
                </Flex>
                <MaterialsTable />
            </Flex>
        </div>
    );
};
