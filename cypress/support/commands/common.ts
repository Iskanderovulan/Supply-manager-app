import { LOCAL_STORAGE_TOKEN_KEY } from "@shared/const/localstorage";
import { User } from "@shared/types/auth";

export const login = (email: string, password: string) => {
    return cy
        .request({
            method: "POST",
            url: "http://localhost:5050/v1/auth/login",
            body: {
                email,
                password,
            },
        })
        .then((response) => {
            const { tokens } = response.body;
            window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, tokens.access.token);
        });
};

export const getByTestId = (testId: string) => {
    return cy.get(`[data-testid="${testId}"]`);
};

declare global {
    namespace Cypress {
        interface Chainable {
            login(email?: string, password?: string): Chainable<User>;
            getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}
