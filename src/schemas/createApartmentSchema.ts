import joi from "joi";

const apartmentsDetails = joi
  .object()
  .keys({
    name: joi.string().required(),
    value: joi.string().required(),
  })
  .meta({ className: "apartmentDetails" });

const apartmentCommodities = joi.object().keys({
  name: joi.string().required(),
  has: joi.boolean().required(),
});

const createApartmentSchema = joi
  .object()
  .keys({
    simpleLocation: joi.string().required(),
    basicPrice: joi.number().required(),
    name: joi.string().required(),
    details: joi.array().items(apartmentsDetails),
    type: joi.string().valid("Apartment", "Studio"),
    bathroom: joi.number().required(),
    bedroom: joi.number().required(),
    kitchen: joi.boolean().required(),
    beds: joi.number().required(),
    about: joi.string().required(),
  })
  .meta({ className: "createApartment" });

export { createApartmentSchema };
