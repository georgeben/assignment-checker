import Joi from "@hapi/joi";

const assignmentSchema = Joi.object({
  student: Joi.string()
    .trim()
    .required(),
  path: Joi.string()
    .trim()
    .required(),
});
export const submissionSchema = Joi.object({
  firstSubmission: assignmentSchema.required(),
  secondSubmission: assignmentSchema.required(),
});

export default () => ({
  submissionSchema,
});
