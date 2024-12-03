import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import {
  Apartments,
  ApartmentsCommodities,
  ApartmentsRules,
  ApartmentsPropertySecurity,
  ApartmentsContacts,
  Guests,
  Sessions,
  ApartmentsDetails,
  ApartmentsReviews,
  ApartmentsImages,
} from "../models/index.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const isLocal = process.env.IS_LOCAL === "true";

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  models: [
    Apartments,
    ApartmentsCommodities,
    ApartmentsRules,
    ApartmentsPropertySecurity,
    ApartmentsContacts,
    ApartmentsReviews,
    ApartmentsDetails,
    ApartmentsImages,
    Sessions,
    Guests,
  ],
  ...(isLocal
    ? {}
    : {
        ssl: {
          requestCert: true,
          rejectUnauthorized: false,
        },
      }),
  url: process.env.DATABASE_URL,
  define: {
    underscored: true,
  },
});

export default sequelize;
