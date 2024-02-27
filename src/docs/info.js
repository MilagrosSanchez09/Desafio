import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "API",
            version: "1.0.0",
            description: "Documentación del proyecto",
        },
    },
    apis: ["../routes/products.router.js", "../routes/carts.router.js"],
};

export const apiDoc = swaggerJSDoc(swaggerOptions);