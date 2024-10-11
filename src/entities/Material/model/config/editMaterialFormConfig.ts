import { materialFormConfig } from "./materialFormConfig";

export const editMaterialFormConfig = JSON.parse(JSON.stringify(materialFormConfig));
editMaterialFormConfig.buttons[0].label = "editMaterial";
