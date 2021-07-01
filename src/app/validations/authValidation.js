import Joi from "@hapi/joi";

const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .trim()
    .required(),
});

export default () => ({
  loginSchema,
});
