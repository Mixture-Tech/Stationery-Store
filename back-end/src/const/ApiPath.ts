export const ApiPath = {
    BaseApi: "/api/v1",
    CREATE_USER: "/api/v1/create-user",
    GET_USER_BY_ID: "/api/v1/get-user-by-id/:id",
    GET_ALL_USERS: "/api/v1/get-all-users",
    UPDATE_USER: "/api/v1/update-user/:id",
    DELETE_USER: "/api/v1/delete-user/:id",

    CREATE_PRODUCT: "/api/v1/products",
    GET_ALL_PRODUCTS: "/api/v1/get-all-products",
    GET_PRODUCT_BY_ID: "/api/v1/products/:id",
    UPDATE_PRODUCT: "/api/v1/products/:id",
    DELETE_PRODUCT: "/api/v1/products/:id",

    // Auth paths
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    LOGOUT: "/api/v1/auth/logout"
};