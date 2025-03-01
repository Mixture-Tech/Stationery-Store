import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API Documentation",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
    },
    apis: [
        `${__dirname}/routers/*.js`,
        `${__dirname}/routers/*.ts`,
        `${__dirname}/swagger.js`,
        `${__dirname}/swagger.s`,
    ]
})

export default swaggerSpec;