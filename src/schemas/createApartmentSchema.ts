import joi from "joi";
import { ApartmentType } from "../models";

const apartmentsDetailsSchema = joi.object().keys({
  name: joi.string().required(),
  value: joi.string().required(),
});

const apartmentCommodities = joi.object().keys({
  name: joi.string().required(),
  has: joi.boolean().required(),
});

const apartmentRules = joi.object().keys({
  check_in: joi.string().required(),
  check_out: joi.string().required(),
  guests_quantity: joi.number().required(),
});

const apartmentContacts = joi.object().keys({
  contact_name: joi.string().required(),
  phone: joi.string().required(),
  email: joi.string().optional(),
});

const apartmentPropertySecurities = joi.object().keys({
  name: joi.string().required(),
  value: joi.string().required(),
});

const createApartmentSchema = joi
  .object()
  .keys({
    simpleLocation: joi.string().required(),
    basicPrice: joi.number().required(),
    name: joi.string().required(),
    type: joi
      .string()
      .valid(...Object.keys(ApartmentType))
      .required(),
    bathroom: joi.number().required(),
    bedroom: joi.number().required(),
    kitchen: joi.boolean().required(),
    beds: joi.number().required(),
    about: joi.string().required(),
    details: joi.array().items(apartmentsDetailsSchema).required(),
    commodities: joi.array().items(apartmentCommodities).required(),
    rules: apartmentRules.required(),
    contacts: joi.array().items(apartmentContacts).required(),
    property_security: joi
      .array()
      .items(apartmentPropertySecurities)
      .required(),
  })
  .meta({ className: "createApartment" });

export { createApartmentSchema };
