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
  ssl: {
    requestCert: true,
    rejectUnauthorized: false, // Permite conexões com certificados não verificados
  },
  url: process.env.DATABASE_URL,
  define: {
    underscored: true,
  },
});

export default sequelize;
