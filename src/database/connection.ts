import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import {
  Apartments,
  ApartmentsCommodities,
  ApartmentsRules,
  ApartmentsPropertySecurity,
  ApartmentsContacts,
  Guests,
  ApartmentsDetails,
  ApartmentsReviews,
} from "../models/index.js";
import { Sessions } from "../models/guests/session.js";

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
    Sessions,
    Guests,
  ],
  ssl: true,
  url: process.env.DATABASE_URL,
  define: {
    underscored: true,
  },
});

export default sequelize;
