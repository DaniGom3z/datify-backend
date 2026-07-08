import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
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

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;