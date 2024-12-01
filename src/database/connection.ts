import { Sequelize } from "@sequelize/core";
import dotenv from "dotenv";
import {
  Apartments,
  ApartmentsCommodities,
  ApartmentsRules,
  ApartmentsPropertySecurity,
  ApartmentsContacts,
  Guests,
  ApartmentsDetails,
  ApartmentsReviews,
} from "../models";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  models: [
    Apartments,
    ApartmentsCommodities,
    ApartmentsRules,
    ApartmentsPropertySecurity,
    ApartmentsContacts,
    ApartmentsReviews,
    ApartmentsDetails,
    Guests,
  ],
  url: "postgresql://localhost:5434/host_ape_db?user=postgres&password=senha123",
  define: {
    underscored: true,
  },
});

export default sequelize;
