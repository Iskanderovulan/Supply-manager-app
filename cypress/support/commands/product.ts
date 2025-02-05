export const selectFirstAntdDropdown = (selector: string) => {
    cy.get(selector).click();

    cy.get(".ant-select-dropdown")
        .not(".ant-select-dropdown-hidden")
        .find(".ant-select-item-option")
        .first()
        .click({ force: true });
};

declare global {
    namespace Cypress {
        interface Chainable {
            selectFirstAntdDropdown(selector: string): Chainable<void>;
        }
    }
}
