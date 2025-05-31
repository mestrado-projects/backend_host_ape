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
  Users,
  Bookings,
  Testimonials,
  FAQ,
  Itinerary,
} from "../models/index.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const isLocal = process.env.ENVIRONMENT === 'local';

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5434'),
  database: process.env.POSTGRES_DB || 'host_ape_db',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'senha123',
  models: [
    Apartments,
    ApartmentsCommodities,
    ApartmentsRules,
    ApartmentsPropertySecurity,
    ApartmentsContacts,
    ApartmentsReviews,
    ApartmentsDetails,
    ApartmentsImages,
    Bookings,
    FAQ,
    Itinerary,
    Testimonials,
    Sessions,
    Guests,
    Users
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
