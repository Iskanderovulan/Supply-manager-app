import * as commonCommands from "./commands/common";
import * as productCommands from "./commands/product";

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(productCommands);

export {};
