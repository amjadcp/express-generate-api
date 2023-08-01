import Joi from "joi"

// sample use-case
const signUpSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  organisationName: Joi.string().min(3).optional(),
  professionalType: Joi.string().optional(),
  smsConsent: Joi.boolean().required(),
});

export{
  signUpSchema,
};