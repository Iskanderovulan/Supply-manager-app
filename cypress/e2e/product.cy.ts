describe("Product CRUD", () => {
    beforeEach(() => {
        cy.login("admin@gmail.com", "Qwerty1!");
        cy.visit("/");
    });

    const mockClassificators = () => {
        cy.intercept("GET", "**/v1/materials*", {
            statusCode: 200,
            body: { results: [{ id: "mat-1", name: "Plastic" }] },
        }).as("getMaterials");

        cy.intercept("GET", "**/v1/colors*", {
            statusCode: 200,
            body: { results: [{ id: "col-1", name: "Red" }] },
        }).as("getColors");

        cy.intercept("GET", "**/v1/packs*", {
            statusCode: 200,
            body: { results: [{ id: "pack-1", name: "Box" }] },
        }).as("getPacks");
    };

    const createProduct = (product: any) => {
        const mockProduct = { ...product, id: "12345" };

        cy.intercept("POST", "**/v1/products", {
            statusCode: 201,
            body: mockProduct,
        }).as("createProduct");

        cy.intercept("GET", "**/v1/products*", {
            statusCode: 200,
            body: { results: [mockProduct], totalResults: 1 },
        }).as("getProductsAfterCreate");

        cy.getByTestId("open-create-modal").click();
        cy.wait("@getMaterials");
        cy.wait("@getColors");
        cy.wait("@getPacks");

        cy.get("#name").type(product.name);
        cy.get("#description").type(product.description);
        cy.get("#price").type(product.price.toString());

        cy.wait(500);
        cy.selectFirstAntdDropdown("#material");
        cy.wait(500);
        cy.selectFirstAntdDropdown("#color");
        cy.wait(500);
        cy.selectFirstAntdDropdown("#pack");

        cy.get('button[type="submit"], input[type="submit"]').click();
        cy.wait("@createProduct").its("response.statusCode").should("eq", 201);

        cy.wait("@getProductsAfterCreate");

        return mockProduct;
    };

    const editProduct = (product: any) => {
        cy.intercept("PATCH", `**/v1/products/${product.id}`, {
            statusCode: 200,
            body: { ...product, name: "Updated Product Name" },
        }).as("updateProduct");

        cy.getByTestId("product-table").should("contain", product.name);

        cy.getByTestId(`edit-product-${product.id}`).should("exist").click();

        cy.get("#name").clear().type("Updated Product Name");

        cy.get('button[type="submit"], input[type="submit"]').click();
        cy.wait("@updateProduct").its("response.statusCode").should("eq", 200);

        cy.get(".ant-modal .ant-modal-content").should("not.exist");
    };

    const deleteProduct = (product: any) => {
        cy.intercept("DELETE", `**/v1/products/${product.id}`, {
            statusCode: 200,
            body: {},
        }).as("deleteProduct");

        cy.getByTestId(`delete-product-${product.id}`).should("exist").click();

        cy.getByTestId("confirm-delete").click();
        cy.wait("@deleteProduct").its("response.statusCode").should("eq", 200);
    };

    it("should mock product CRUD without real API requests", () => {
        cy.fixture("product.json").then((product) => {
            mockClassificators();
            const createdProduct = createProduct(product);
            editProduct(createdProduct);
            deleteProduct(createdProduct);
        });
    });
});
