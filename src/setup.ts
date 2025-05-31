import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import swaggerJSDoc from 'swagger-jsdoc'

// if (process.env.ENVIRONMENT === "local") {
//   const joiToTypescript = require("joi-to-typescript");

//   joiToTypescript.convertFromDirectory({
//     schemaDirectory: "./src/schemas",
//     typeOutputDirectory: "./src/interfaces",
//     debug: true,
//   });
// }

const options = {
  failOnErrors: true,
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Host Ape',
          version: '1.0.0',
          description: 'Documentação gerada automaticamente com swagger-jsdoc',
      },
      servers: [
          {
              url: 'http://localhost:5000',
              description: 'Servidor local',
          },
          {
            url: 'https://app.hostaape.staging.com',
            description: 'Ambiente Staging',
          },
          {
              url: 'https://app.hostaape.com',
              description: 'Ambiente Producao',
          },
      ],
    },
    apis: ['./dist/router/*.js'],
}

export const swaggerDefinition = swaggerJSDoc(options);