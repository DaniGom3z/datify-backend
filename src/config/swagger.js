"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Datify API Documentation",
            version: "1.0.0",
            description: "Documentación de la API de Datify.",
        },
        servers: [
            {
                url: "http://localhost:4000",
                description: "Servidor de Desarrollo Local",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Ingresa el token JWT en formato: Bearer <TOKEN>",
                },
            },
        },
    },
    apis: ["./src/routes/*.ts", "./src/routes/*.js"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
