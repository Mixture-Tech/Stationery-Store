import * as swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: "3.0.3",
    info: {
        title: "Stationery Store API Documentation",
        version: "1.0.0",
        description: "API Documentation for Stationery Store",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Development server"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
};

const options = {
    swaggerDefinition,
    apis: [
        "./src/controller/*.ts",
        "./src/routes/*.ts"
    ]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;