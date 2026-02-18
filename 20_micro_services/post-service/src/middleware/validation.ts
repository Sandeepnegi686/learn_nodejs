import Joi from "joi";
type postValidationType = {
  content: string;
  mediaIds?: string[];
  user?: string;
};
function postValidation(data: postValidationType) {
  const schema = Joi.object({
    content: Joi.string().min(3).required(),
    mediaIds: Joi.array().required(),
  });
  return schema.validate(data);
}

export { postValidation };
