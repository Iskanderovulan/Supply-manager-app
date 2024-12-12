import { useContext } from "react";
import { CollapseContext } from "./collapseContext";

export const useCollapsed = () => {
    const context = useContext(CollapseContext);
    if (!context) {
        throw new Error("useCollapsed must be used within a CollapseProvider");
    }
    return context;
};
