import dotenv from "dotenv";
if (process.env.ENVIRONMENT === "local") {
    const joiToTypescript = require("joi-to-typescript");
    joiToTypescript.convertFromDirectory({
        schemaDirectory: "./src/schemas",
        typeOutputDirectory: "./src/interfaces",
        debug: true,
    });
}
dotenv.config({ path: ".env" });
