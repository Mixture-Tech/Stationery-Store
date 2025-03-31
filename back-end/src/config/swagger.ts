import { SwaggerOptions } from "swagger-ui-express";
import { SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Stationery Store API",
        version: "1.0.0",
        description: "API documentation for Stationery Store",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Development server",
        },
    ],
    components: {
        schemas: {
            UserDTO: {
                type: "object",
                properties: {
                    id: {
                        type: "number",
                        description: "ID của người dùng",
                    },
                    email: {
                        type: "string",
                        description: "Email của người dùng",
                    },
                    password: {
                        type: "string",
                        description: "Mật khẩu của người dùng",
                    },
                    role: {
                        type: "string",
                        description: "Vai trò của người dùng",
                    },
                },
                required: ["email", "password", "role"],
            },
            ProductDTO: {
                type: "object",
                properties: {
                    id: {
                        type: "number",
                        description: "ID của sản phẩm",
                    },
                    name: {
                        type: "string",
                        description: "Tên sản phẩm",
                    },
                    nums: {
                        type: "number",
                        description: "Số lượng sản phẩm",
                    },
                    price: {
                        type: "number",
                        description: "Giá sản phẩm",
                    },
                    detail: {
                        type: "string",
                        description: "Chi tiết sản phẩm",
                    },
                    brand: {
                        type: "string",
                        description: "Thương hiệu sản phẩm",
                    },
                    category: {
                        type: "object",
                        description: "Danh mục sản phẩm",
                    },
                },
                required: ["name", "nums", "price", "brand"],
            },
            CategoryDTO: {
                type: "object",
                properties: {
                    id: {
                        type: "number",
                        description: "ID của danh mục",
                    },
                    name_category: {
                        type: "string",
                        description: "Tên danh mục",
                    },
                    link: {
                        type: "string",
                        description: "Link của danh mục",
                    },
                    hide: {
                        type: "boolean",
                        description: "Trạng thái ẩn/hiện",
                    },
                },
                required: ["name_category"],
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

const swaggerOptions: SwaggerOptions = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"], // đường dẫn tới các file routes
};

export default swaggerOptions; 