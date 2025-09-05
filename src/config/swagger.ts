import swaggerJSDoc from "swagger-jsdoc";
import { env } from "./env";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Blog API", version: "1.0.0" },
    servers: [{ url: `http://localhost:${env.PORT}` }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
      }
    }
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"]
});
